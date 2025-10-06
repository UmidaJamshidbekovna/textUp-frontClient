import { useMutation, useQuery } from "react-query";
import httpRequest from "./httpRequest";

const nickNameService = {
  list: (params) => httpRequest.get(`nick-names`, { params }),
  create: (data) => httpRequest.post(`nick-names`, data),
};

export const useNickNamesGetList = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ["NICKNAMES-GET-LIST", params],
    () => nickNameService.list(params),
    { ...queryParams }
  );
};

export const useNickNameCreateMutation = (mutationSettings = {}) => {
  return useMutation((data) => nickNameService.create(data), {
    ...mutationSettings,
  });
};

export default nickNameService;
