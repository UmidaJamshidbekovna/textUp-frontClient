import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSmsGetList } from "@/services/sms.service";
import { useGroupsGetList } from "@/services/groups.service";
import useCustomToast from "@/hooks/useCustomToast";

export const useReportByDate = ({ reportByDate, user }) => {
  const { errorToast } = useCustomToast();
  const [groupOptions, setGroupOptions] = useState([]);
  const router = useRouter();
  const page = router.query?.page ?? 1;
  const limit = router.query?.limit ?? 10;

  const [chakraData, setChakraData] = useState({
    smsList: reportByDate?.smsList ?? [],
    count: reportByDate?.count ?? 0,
    deliveredCount: reportByDate?.deliveredCount ?? 0,
    notDeliveredCount: reportByDate?.notDeliveredCount ?? 0,
    sendCount: reportByDate?.sendCount ?? 0,
  });

  const [filters, setFilters] = useState({
    from_date: "",
    to_date: "",
    status: "",
    type: "",
    search: "",
    groupId: "",
  });

  const searchInputRef = useRef(null);
  const debounceTimer = useRef(null);

  // Debounced search handler
  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      setFilters((old) => ({ ...old, search: value }));
    }, 500);
  };

  // Date range change handler
  const handleDateRangeChange = (dateObjects) => {
    if (
      dateObjects &&
      dateObjects.length === 2 &&
      dateObjects[0] &&
      dateObjects[1]
    ) {
      const from_date = dateObjects[0].format("YYYY-MM-DD");
      const to_date = dateObjects[1].format("YYYY-MM-DD");
      setFilters((old) => ({
        ...old,
        from_date,
        to_date,
      }));
    }
  };

  // Status filter change handler
  const handleStatusChange = (status) => {
    setFilters((old) => ({ ...old, status }));
  };

  // Group filter change handler
  const handleGroupChange = (groupId) => {
    setFilters((old) => ({ ...old, groupId }));
  };

  // Reset all filters
  const handleReset = () => {
    setFilters({
      from_date: "",
      to_date: "",
      status: "",
      type: "",
      search: "",
      groupId: "",
    });
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  };

  // Build API params
  const buildApiParams = () => {
    const p = { userId: user?.id, page, limit };

    // Add group ID if exists
    if (router.query?.groupId) p.groupId = router.query.groupId;

    // Add date filter based on range picker
    if (filters.from_date && filters.to_date) {
      p.from = filters.from_date;
      p.to = filters.to_date;
    }

    // Add status filter
    if (filters.status) {
      p.status = filters.status;
    }

    // Add search filter
    if (filters.search) {
      p.search = filters.search;
    }

    // Add group filter
    if (filters.groupId) {
      p.groupId = filters.groupId;
    }

    return p;
  };

  // API call
  const { isLoading } = useSmsGetList({
    queryParams: {
      onSuccess: (res) => {
        setChakraData({
          smsList: res?.smsList ?? [],
          count: res?.count ?? 0,
          deliveredCount: res?.deliveredCount ?? 0,
          notDeliveredCount: res?.notDeliveredCount ?? 0,
          sendCount: res?.sendCount ?? 0,
        });
      },
    },
    params: buildApiParams(),
  });

  const { isLoading: groupsLoading, data: groupsData } = useGroupsGetList({
    queryParams: {
      onSuccess: (res) => {
        console.log("groupsData", res);
        const arr = res?.groups?.map((el) => ({ id: el?.id, label: el?.name }));
        setGroupOptions(arr);
      },
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
      enabled: !!user?.id,
    },
    params: {
      userId: user?.id,
      page: 1,
      limit: 999,
    },
  });

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    chakraData,
    filters,
    isLoading,
    searchInputRef,
    handleSearchChange,
    handleDateRangeChange,
    handleStatusChange,
    handleGroupChange,
    handleReset,
    groupOptions,
  };
};
