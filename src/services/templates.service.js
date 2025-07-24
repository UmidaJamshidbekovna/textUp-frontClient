import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const templatesService = {
	templatesGetList: (params) => httpRequest.get(`templates`, { params }),
	templateGetById: (id) => httpRequest.get(`templates/${id}`),
	create: (data) => httpRequest.post(`templates`, data),
	templateDelete: ({ id }) => httpRequest.delete(`templates/${id}`),
	templateEdit: ({ id, data }) => httpRequest.put(`templates/${id}`, data),
}

export const useTemplateCreateMutation = (mutationSettings = {}) => {
	return useMutation((data) => templatesService.create(data), { ...mutationSettings });
};

export const useTemplateDeleteMutation = (mutationSettings = {}) => {
	return useMutation(({ id }) => templatesService.templateDelete({ id }), { ...mutationSettings });
};

export const useTemplateEdit = (mutationSettings = {}) => {
	return useMutation(({ id, data }) => templatesService.templateEdit({ id, data }), { ...mutationSettings });
};

export const useTemplatesGetList = ({ params = {}, queryParams = {} } = {}) => {
	return useQuery(["templates-GET-LIST", params], () => templatesService.templatesGetList(params), { ...queryParams })
};

export const useTemplateGetById = ({ id = "", queryParams = {} } = {}) => {
	return useQuery(["template-GET-BY-ID", id], () => templatesService.templateGetById(id), { ...queryParams })
};

export default templatesService