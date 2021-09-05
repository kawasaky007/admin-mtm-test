import { API_CONFIG } from "../../api"
import axiosConfig from "../../api/axiosConfig"
import { ICategory } from "./ICategory"

export default {
    getAll: (paramsValue: ICategory) => {

        return axiosConfig.get<any>(`${API_CONFIG.CATEGORY.GET}`,
            { params: paramsValue })
    },
    edit: (id: number, data: any) => {

        return axiosConfig.put<any>(`${API_CONFIG.CATEGORY.EDIT(id)}`, data)
    },
    delete: (id: number) => {
        return axiosConfig.delete<any>(`${API_CONFIG.CATEGORY.DELETE(id)}`)

    },
    create: (data: any) => {
        return axiosConfig.post<any>(`${API_CONFIG.CATEGORY.CREATE}`, data)
    }


}