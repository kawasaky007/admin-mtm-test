import { API_CONFIG } from "../../api";
import axiosConfig from "../../api/axiosConfig";
import { ILogin } from "./ILogin";

export default {
    login: (params: ILogin): any => {

        return axiosConfig.post(API_CONFIG.AUTH.LOGINADMIN, params)
    },


}
