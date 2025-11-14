import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const contactsService = {
	contactsGetList: (params) => httpRequest.get(`contacts`, { params }),
	contactGetById: (id) => httpRequest.get(`contacts/${id}`),
	create: (data) => httpRequest.post(`contacts`, data),
	contactDelete: ({ id }) => httpRequest.delete(`contacts/${id}`),
	contactsDeleteMultiple: ({ userId, contactIds }) => httpRequest.delete(`contacts/delete-multiple`, { data: { userId, contactIds } }),
	contactEdit: ({ id, data }) => httpRequest.put(`contacts/${id}`, data),
	contactsExport: (params) => httpRequest.get('contacts/export', {
		params,
		responseType: 'blob',
		headers: {
			accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		},
	}),
	contactsImport: (data) => httpRequest.post('contacts/import', data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			accept: 'application/json',
		},
	})
}

export const useContactCreateMutation = (mutationSettings = {}) => {
	return useMutation((data) => contactsService.create(data), { ...mutationSettings });
};

export const useContactDeleteMutation = (mutationSettings = {}) => {
	return useMutation(({ id }) => contactsService.contactDelete({ id }), { ...mutationSettings });
};

export const useContactsDeleteMultipleMutation = (mutationSettings = {}) => {
	return useMutation(({ userId, contactIds }) => contactsService.contactsDeleteMultiple({ userId, contactIds }), { ...mutationSettings });
};

export const useContactEdit = (mutationSettings = {}) => {
	return useMutation(({ id, data }) => contactsService.contactEdit({ id, data }), { ...mutationSettings });
};

export const useContactsGetList = ({ params = {}, queryParams = {} } = {}) => {
	return useQuery(["contacts-GET-LIST", params], () => contactsService.contactsGetList(params), { ...queryParams })
};

export const useContactGetById = ({ id = "", queryParams = {} } = {}) => {
	return useQuery(["contact-GET-BY-ID", id], () => contactsService.contactGetById(id), { ...queryParams })
};

export const useContactsImport = (mutationSettings = {}) => {
	return useMutation(
		(formData) => contactsService.contactsImport(formData),
		{
			...mutationSettings,
		}
	);
};

export const useContactsExport = (mutationSettings = {}) => {
	return useMutation(
		(params) => contactsService.contactsExport(params),  // функция для выполнения запроса
		{
			onSuccess: (data) => {
				const url = window.URL.createObjectURL(new Blob([data], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				}));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'contacts.xlsx');
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(url); // для очистки URL после использования
			},
			onError: (error) => {
				console.error('Ошибка при скачивании файла:', error);
			},
			...mutationSettings,
		}
	);
};

export default contactsService