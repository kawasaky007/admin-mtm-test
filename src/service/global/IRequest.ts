export interface IPageRequest {
    page: number;
    per_page: number;
    name?: string;
}
export interface ButtonTypes {
    type: [
        "default",
        "primary",
        "ghost",
        "dashed",
        "link",
        "text"]
}
;