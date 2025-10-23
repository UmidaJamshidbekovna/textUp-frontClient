import { useMutation } from "react-query";
import httpRequest from "./httpRequest";

const authService = {
  login: (data) => httpRequest.post(`login`, data),
  register: (data) => httpRequest.post(`register`, data),
  otpSend: (data) => httpRequest.post(`otp/send`, data),
  resetPassword: (data) => httpRequest.put(`users/password`, data),

  // refreshToken: (data) => httpRequest.post(`auth/refresh`, data),
  // nursCreate: (data) => httpRequest.post(`auth/nurse`, data),
  // doctorCreate: (data) => httpRequest.post(`auth/doctor`, data),
};

export const useLogin = (mutationSettings = {}) => {
  return useMutation((data) => authService.login(data), {
    ...mutationSettings,
  });
};

export const useRegisterMutation = (mutationSettings = {}) => {
  return useMutation((data) => authService.register(data), {
    ...mutationSettings,
  });
};

export const useOtpSendMutation = (mutationSettings = {}) => {
  return useMutation((data) => authService.otpSend(data), {
    ...mutationSettings,
  });
};

export const useResetPasswordMutation = (mutationSettings = {}) => {
  return useMutation((data) => authService.resetPassword(data), {
    ...mutationSettings,
  });
};

// export const useRefreshToken = (mutationSettings = {}) => {
// 	return useMutation((data) => authService.refreshToken(data), { ...mutationSettings });
// };

// export const useNursCreate = (mutationSettings = {}) => {
// 	return useMutation((data) => authService.nursCreate(data), { ...mutationSettings });
// };

// export const useDoctorCreate = (mutationSettings = {}) => {
// 	return useMutation((data) => authService.doctorCreate(data), { ...mutationSettings });
// };

export default authService;
