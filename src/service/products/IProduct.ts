import { IPageRequest } from "../global";

export interface IProducts extends IPageRequest {
    nested?: boolean
}