import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const transactionsService = {
	transactionsGetList: (params) => httpRequest.get(`transactions`, { params }),
	transactionGetById: (id) => httpRequest.get(`transactions/${id}`),
	create: (data) => httpRequest.post(`transactions`, data),
	transactionDelete: ({ id }) => httpRequest.delete(`transactions/${id}`),
	transactionEdit: ({ id, data }) => httpRequest.put(`transactions/${id}`, data),
}

export const useTransactionCreateMutation = (mutationSettings = {}) => {
	return useMutation((data) => transactionsService.create(data), { ...mutationSettings });
};

export const useTransactionDeleteMutation = (mutationSettings = {}) => {
	return useMutation(({ id }) => transactionsService.transactionDelete({ id }), { ...mutationSettings });
};

export const useTransactionEdit = (mutationSettings = {}) => {
	return useMutation(({ id, data }) => transactionsService.transactionEdit({ id, data }), { ...mutationSettings });
};

export const useTransactionsGetList = ({ params = {}, queryParams = {} } = {}) => {
	return useQuery(["transactions-GET-LIST", params], () => transactionsService.transactionsGetList(params), { ...queryParams })
};

export const useTransactionGetById = ({ id = "", queryParams = {} } = {}) => {
	return useQuery(["transaction-GET-BY-ID", id], () => transactionsService.transactionGetById(id), { ...queryParams })
};

export default transactionsService