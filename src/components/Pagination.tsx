import { logDOM } from "@testing-library/react";
import { Pagination } from "antd";
import { loadavg } from "os";
import { useState } from "react";

export default function MyPagination({ props, setPagination, setLoading }: any) {
    const { page, totalDocs } = props;
    const [current, setCurrent] = useState(page ? page : 1);
    const onChange = (page: any, pageSize: any) => {
        console.log(page);

        setCurrent(page);
        setPagination({

            page: page,
            per_page: pageSize,
        });
        setLoading(true);
    };

    return (
        <Pagination
            current={current}
            total={totalDocs}
            onChange={onChange}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger
        />
    );
}