import { IPageRequest } from "..";

export interface IProducts extends IPageRequest {
    nested?: boolean
}