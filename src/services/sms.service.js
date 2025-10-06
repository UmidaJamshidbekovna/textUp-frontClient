import { useMutation, useQuery } from 'react-query'
import httpSMS from './httpSMS'

const smsService = {
    smsGetList: (params) => httpSMS.get(`sms`, { params }),
    create: (data) => httpSMS.post(`send`, data),
    smsGetById: (id) => httpSMS.get(`sms/${id}`),
    smsDelete: ({ id }) => httpSMS.delete(`sms/${id}`),
    smsEdit: ({ id, data }) => httpSMS.put(`sms/${id}`, data),
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