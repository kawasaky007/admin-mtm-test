export const API_URL = 'https://mtm-api-staging.herokuapp.com';
export const API_CONFIG = {
    AUTH: {
        LOGINADMIN: `/admin/auth/signin`
    },
    USER: {
        GET: `/v1/admin/users`,
        EDIT: (id: number) => `/v1/admin/users/${id}`
    },
    CATEGORY: {
        GET: `/v1/admin/categories`,
        EDIT: (id: number) => `/v1/admin/categories/${id}`,
        DELETE: (id: number) => `/v1/admin/categories/${id}`,
        CREATE: `/v1/admin/categories`
    },
    PRODUCTS: {
        GET: `/v1/admin/products`,
        GETDETAIL: (id: number) => `/v1/admin/products/${id}`,
        EDIT: (id: number) => `/v1/admin/products/${id}`,
        DELETE: (id: number) => `/v1/admin/products/${id}`,
        CREATE: `/v1/admin/products`
    },
    SALES: {
        GET: `/v1/admin/sales`,
        EDIT: (id: number) => `/v1/admin/sales/${id}`,
        DELETE: (id: number) => `/v1/admin/sales/${id}`,
        CREATE: `/v1/admin/sales`
    },
    BANNERS: {
        GET: `/v1/admin/banners`,
        EDIT: (id: number) => `/v1/admin/banners/${id}`,
        DELETE: (id: number) => `/v1/admin/banners/${id}`,
        CREATE: `/v1/admin/banners`
    }

}