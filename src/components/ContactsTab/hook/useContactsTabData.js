import { useState } from "react";
import { useRouter } from "next/router";
import {
  useContactDeleteMutation,
  useContactEdit,
  useContactsDeleteMultipleMutation,
  useContactsExport,
  useContactsGetList,
} from "@/services/contacts.service";
import useCustomToast from "@/hooks/useCustomToast";

const apiKeys = {
  active: "active",
  inactive: "inactive",
  banned: "cancelled",
  blocked: "blocked",
};

const expectedData = {
  active: 0,
  blocked: 0,
  cancelled: 0,
  contacts: [],
  count: 0,
  inactive: 0,
};

export const useContactsTabData = ({ SSRContacts, group, user }) => {
  const { successToast, errorToast, infoToast } = useCustomToast();
  const router = useRouter();
  const page = router.query?.page ?? 1;
  const limit = router.query?.limit ?? 10;
  const [chakraData, setChakraData] = useState(SSRContacts || expectedData);
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deleteState, setDeleteState] = useState({});
  const [objId, setObjId] = useState("");
  const [filters, setFilters] = useState({ search: "" });

  // Contacts API call
  const { isLoading, refetch } = useContactsGetList({
    params: (() => {
      const p = {
        userId: user?.id,
        page,
        limit,
        status: apiKeys?.[router.query.contactsTab || "all"],
        search: filters.search,
      };
      if (group?.id) p.groupId = group.id;
      if (router.query?.groupId) p.groupId = router.query.groupId;
      return p;
    })(),
    queryParams: {
      initialData: SSRContacts,
      onSuccess: (res) => {
        setChakraData(res ?? []);
      },
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
      enabled: !!user?.id,
    },
  });

  // Contact edit mutation
  const { mutate: editMutate, isLoading: editLoading } = useContactEdit({
    onSuccess: (res) => {
      refetch();
      successToast();
    },
    onError: (err) => {
      errorToast(`${err?.status}, ${err?.data?.error}`);
      console.log(err);
    },
  });

  // Contact delete mutation
  const { mutate, isLoading: deleteLoading } = useContactDeleteMutation({
    onSuccess: (res) => {
      refetch();
      successToast();
    },
    onError: (err) => {
      errorToast(`${err?.status}, ${err?.data?.error}`);
      console.log(err);
    },
  });

  // Multiple contacts delete mutation
  const { mutate: multipleDeleteMutate, isLoading: isMultipleDeleteLoading } =
    useContactsDeleteMultipleMutation({
      onSuccess: (res) => {
        refetch();
        successToast();
      },
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
    });

  // Contacts export mutation
  const { mutate: download, isLoading: isDownloadLoading } = useContactsExport({
    userId: user?.id,
  });

  return {
    // Data
    chakraData,
    isLoading,

    // State
    confirmClicked,
    setConfirmClicked,
    selectedUsers,
    setSelectedUsers,
    deleteState,
    setDeleteState,
    objId,
    setObjId,
    filters,
    setFilters,

    // Actions
    refetch,
    editMutate,
    editLoading,
    mutate,
    deleteLoading,
    multipleDeleteMutate,
    isMultipleDeleteLoading,
    download,
    isDownloadLoading,
  };
};
