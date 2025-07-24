import { setCookie, destroyCookie } from 'nookies';

export const login = ({
    accessToken,
    refreshToken,
    email,
    id,
    phone,
    roleId,
    status,
    permissions,
}) => {
    setCookie(null, 'accessToken', accessToken, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'refreshToken', refreshToken, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'email', email, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'id', id, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'phone', phone, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'roleId', roleId, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    setCookie(null, 'status', status, { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
    // setCookie(null, 'permissions', JSON.stringify(permissions), { domain: process.env.NEXTAUTH_URL, path: "/", maxAge: 30 * 24 * 60 * 60, });
};

export const logout = (context) => {
    destroyCookie(null, 'accessToken', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'refreshToken', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'email', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'id', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'phone', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'roleId', { domain: process.env.NEXTAUTH_URL, path: "/" });
    destroyCookie(null, 'status', { domain: process.env.NEXTAUTH_URL, path: "/" });

    // if (typeof window !== 'undefined') {
    //     // Client-side
    //     window.location.reload();
    // } else {
    //     // Server-side
    //     if (context && context.res) {
    //         context.res.setHeader('Set-Cookie', [
    //             'role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'id=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'permissions=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'from=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //             'to=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; SameSite=None; HttpOnly',
    //         ]);
    //     }
    // }
};

export const isAuthenticated = (context = null) => {
    const cookies = parseCookies(context);
    return !!cookies.accessToken;
};