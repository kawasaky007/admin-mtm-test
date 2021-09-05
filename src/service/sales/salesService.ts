import { API_CONFIG } from "../../api"
import axiosConfig from "../../api/axiosConfig"

export default {
    getAll: (paramsValue: any) => {

        return axiosConfig.get<any>(`${API_CONFIG.SALES.GET}`,
            { params: paramsValue })
    },
    // getDetail: (id: any) => {
    //     try {
    //         return axiosConfig.get(`${API_CONFIG.SALES.GETDETAIL(id)}`)
    //     }
    //     catch (error) {
    //         throw error.error
    //     }
    // },
    edit: (id: number, data: any) => {

        return axiosConfig.put<any>(`${API_CONFIG.SALES.EDIT(id)}`, data)
    },
    delete: (id: number) => {
        return axiosConfig.delete<any>(`${API_CONFIG.SALES.DELETE(id)}`)

    },
    create: (data: any) => {
        return axiosConfig.post<any>(`${API_CONFIG.SALES.CREATE}`, data)
    }



}