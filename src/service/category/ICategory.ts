import { IPageRequest } from "../global";

export interface ICategory extends IPageRequest {
    nested?: boolean
}