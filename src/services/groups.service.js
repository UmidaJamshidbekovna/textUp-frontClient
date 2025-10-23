import { useMutation, useQuery } from "react-query";
import httpRequest from "./httpRequest";

const groupsService = {
  groupsGetList: (params) => httpRequest.get(`groups`, { params }),
  create: (data) => httpRequest.post(`groups`, data),
  groupGetById: (id) => httpRequest.get(`groups/${id}`),
  groupDelete: ({ id, data }) => httpRequest.delete(`groups/${id}`, { data }),
  groupEdit: ({ id, data }) => httpRequest.put(`groups/${id}`, data),
};

export const useGroupCreateMutation = (mutationSettings = {}) => {
  return useMutation((data) => groupsService.create(data), {
    ...mutationSettings,
  });
};

export const useGroupDeleteMutation = (mutationSettings = {}) => {
  return useMutation(
    ({ id, data }) => groupsService.groupDelete({ id, data }),
    { ...mutationSettings }
  );
};

export const useGroupEdit = (mutationSettings = {}) => {
  return useMutation(({ id, data }) => groupsService.groupEdit({ id, data }), {
    ...mutationSettings,
  });
};

export const useGroupsGetList = ({ params = {}, queryParams = {} } = {}) => {
  return useQuery(
    ["groups-GET-LIST", params],
    () => groupsService.groupsGetList(params),
    { ...queryParams }
  );
};

export const useGroupGetById = ({ id = "", queryParams = {} } = {}) => {
  return useQuery(
    ["group-GET-BY-ID", id],
    () => groupsService.groupGetById(id),
    { ...queryParams }
  );
};

export default groupsService;
