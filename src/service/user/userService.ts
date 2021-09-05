import { API_CONFIG } from "../../api"
import axiosConfig from "../../api/axiosConfig"
import { IPageRequest } from "../global"

export default {
    getAll: (paramsValue: IPageRequest) => {

        return axiosConfig.get<any>(`${API_CONFIG.USER.GET}`,
            { params: paramsValue })
    },
    edit: (id: number, dataValue: any) => {

        return axiosConfig.put<any>(`${API_CONFIG.USER.EDIT(id)}`, dataValue)
    }


}