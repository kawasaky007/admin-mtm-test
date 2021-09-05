import { API_CONFIG } from "../../api"
import axiosConfig from "../../api/axiosConfig"

export default {
    getAll: (paramsValue: any) => {

        return axiosConfig.get<any>(`${API_CONFIG.PRODUCTS.GET}`,
            { params: paramsValue })
    },
    getDetail: (id: any) => {
        try {
            return axiosConfig.get(`${API_CONFIG.PRODUCTS.GETDETAIL(id)}`)
        }
        catch (error) {
            throw error;
        }
    },
    edit: (id: number, data: any) => {

        return axiosConfig.put<any>(`${API_CONFIG.PRODUCTS.EDIT(id)}`, data)
    },
    delete: (id: number) => {
        return axiosConfig.delete<any>(`${API_CONFIG.PRODUCTS.DELETE(id)}`)

    },
    create: (data: any) => {
        return axiosConfig.post<any>(`${API_CONFIG.PRODUCTS.CREATE}`, data)
    }



}