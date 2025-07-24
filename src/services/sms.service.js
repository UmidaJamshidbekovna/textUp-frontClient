import { useMutation, useQuery } from 'react-query'
import httpMain from './httpMain'

const smsService = {
    smsGetList: (params) => httpMain.get(`sms`, { params }),
    create: (data) => httpMain.post(`send`, data),
    smsGetById: (id) => httpMain.get(`sms/${id}`),
    smsDelete: ({ id }) => httpMain.delete(`sms/${id}`),
    smsEdit: ({ id, data }) => httpMain.put(`sms/${id}`, data),
}

export const useSmsCreateMutation = (mutationSettings = {}) => {
    return useMutation((data) => smsService.create(data), { ...mutationSettings });
};

export const useSmsDeleteMutation = (mutationSettings = {}) => {
    return useMutation(({ id }) => smsService.smsDelete({ id }), { ...mutationSettings });
};

export const useSmsEdit = (mutationSettings = {}) => {
    return useMutation(({ id, data }) => smsService.smsEdit({ id, data }), { ...mutationSettings });
};

export const useSmsGetList = ({ params = {}, queryParams = {} } = {}) => {
    return useQuery(["sms-GET-LIST", params], () => smsService.smsGetList(params), { ...queryParams })
};

export const useSmsGetById = ({ id = "", queryParams = {} } = {}) => {
    return useQuery(["sms-GET-BY-ID", id], () => smsService.smsGetById(id), { ...queryParams })
};

export default smsService