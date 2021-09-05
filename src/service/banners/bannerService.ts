import { API_CONFIG } from "../../api"
import axiosConfig from "../../api/axiosConfig"
import { IPageRequest } from "../global"

export default {
    getAll: (paramsValue: IPageRequest) => {

        return axiosConfig.get<any>(`${API_CONFIG.BANNERS.GET}`,
            { params: paramsValue })
    },
    edit: (id: number, data: any) => {

        return axiosConfig.put<any>(`${API_CONFIG.BANNERS.EDIT(id)}`, data)
    },
    delete: (id: number) => {
        return axiosConfig.delete<any>(`${API_CONFIG.BANNERS.DELETE(id)}`)

    },
    create: (data: any) => {
        return axiosConfig.post<any>(`${API_CONFIG.BANNERS.CREATE}`, data)
    }


}