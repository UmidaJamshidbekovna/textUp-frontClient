import { useMutation, useQuery } from 'react-query'
import httpRequest from './httpRequest'

const usersService = {
	users: (id) => httpRequest.get(`users/${id}`),
}

// export const useLoginMutation = (mutationSettings = {}) => {
// 	return useMutation((data) => usersService.users(data), { ...mutationSettings });
// };

export const useUserGetById = ({ id = "", queryParams = {} } = {}) => {
	return useQuery(["USER-GET-BY-ID", id], () => usersService.users(id), { ...queryParams })
};

export default usersService