import { useGroupsGetList } from "@/services/groups.service";
import { useTemplatesGetList } from "@/services/templates.service";
import { useNickNamesGetList } from "@/services/nickname.service";
import useCustomToast from "@/hooks/useCustomToast";

export const useSendSMSData = ({ user, groupsCount, templatesCount }) => {
  const userId = user?.id ?? "";
  const { errorToast } = useCustomToast();

  // Groups data
  const { data: groupsData } = useGroupsGetList({
    params: {
      userId,
      page: 1,
      limit: groupsCount,
    },
    queryParams: {
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
      enabled: !!userId,
    },
  });

  // Templates data
  const { data: templatesData } = useTemplatesGetList({
    params: {
      page: 1,
      limit: templatesCount,
      userId,
    },
    queryParams: {
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
      enabled: !!userId,
    },
  });

  // Nicknames data
  const { data: nickNamesData } = useNickNamesGetList({
    params: {
      userId,
      page: 1,
      limit: 50, // Adjust as needed
    },
    queryParams: {
      onError: (err) => {
        errorToast(`${err?.status}, ${err?.data?.error}`);
        console.log(err);
      },
      enabled: !!userId,
    },
  });

  return {
    groupsData,
    templatesData,
    nickNamesData,
    isLoading: !groupsData || !templatesData || !nickNamesData,
  };
};
