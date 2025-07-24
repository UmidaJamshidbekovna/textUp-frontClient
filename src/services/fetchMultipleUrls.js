import authService from "./auth.service"
import httpRequest from "./httpRequest"
import { getCookie } from 'cookies-next'
import { logout } from "./authService"

export const fetchMultipleUrls = async (urls, _, context) => {
  let data
  try {
    let token = getCookie('accessToken', { req: context.req, res: context.res })
    let oldRefreshToken = getCookie('refreshToken', { req: context.req, res: context.res })

    data = await Promise.all(
      urls.map(async (url) => {
        try {
          const response = await httpRequest.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          return response
        } catch (e) {
          if (e?.response?.status === 401 || e?.data?.error_message?.includes("token")) {
            if (e?.data?.error_message?.includes("token")) {
              await authService?.refreshToken({
                token: oldRefreshToken,
              })
                .then(res => {
                  context?.res.setHeader('Set-Cookie', [
                    `accessToken=${res?.accessToken}; Path=/; Secure; SameSite=None; Max-Age=2592000; SameSite=Strict`,
                    `refreshToken=${res?.refreshToken}; Path=/; Secure; SameSite=None; Max-Age=2592000; SameSite=Strict`
                  ])
                  context.res.writeHead(302, { Location: context?.resolvedUrl ?? '/' })
                  context.res.end()
                })
                .catch(err => {
                  console.log(err)
                  logout(context)
                })
            } else {
              await logout(context)
            }
            if (typeof window !== 'undefined') {
              window.location.href = '/login'
            } else {
              context.res.writeHead(302, { Location: '/login' })
              context.res.end()
            }
            return { data: false, message: "Аутентификация не удалась. Пожалуйста, войдите снова." }
          }
          return { isSuccess: false, message: e?.data?.error_message ?? "Ошибка сервера" }
        }
      })
    )
    return data ?? []
  } catch (error) {
    return []
  }
}