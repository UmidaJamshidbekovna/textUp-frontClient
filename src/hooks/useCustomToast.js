import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
	const chakraToast = useToast();

	const infoToast = (title = '', description = '', settings = {}) => {
		chakraToast({
			title,
			description,
			position: 'top-center',
			status: 'info',
			duration: 3000,
			isClosable: true,
			...settings,
		});
	};

	const successToast = (title = 'Success', description = '', settings = {}) => {
		chakraToast({
			title: title,
			description: description,
			position: 'top-center',
			status: 'success',
			duration: 3000,
			isClosable: true,
			...settings,
		});
	};

	const errorToast = (description = '', title, settings = {}) => {
		chakraToast({
			title: '',
			description,
			position: 'top-center',
			status: 'error',
			duration: 3000,
			isClosable: true,
			...settings,
		});
	};

	return { infoToast, successToast, errorToast };
};

export default useCustomToast;
