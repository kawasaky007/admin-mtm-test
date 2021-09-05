import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import MyPagination from "../../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import { IPageRequest } from "../../../service";
import bannerService from "../../../service/banners/bannerService";
import productService from "../../../service/products/productService";
import ListData from "./compoment/ListData";
import ModalBanner from "./compoment/Modal";
const ParamsRequest: IPageRequest = {
    page: 1,
    per_page: 10,
    name: ''
}
export default function Banners() {
    const [todoList, setToDoList] = useState({});
    const [postList, setPostList] = useState(ParamsRequest);
    const [pagination, setPagination] = useState({});
    const [showList, setShowList] = useState(false);
    const checkOnload = useAppSelector((state) => state.form.loadData);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const fetchData = async (value: any) => {
        try {
            setLoading(true);
            const response: any = await bannerService.getAll(value);

            const { data } = response;
            dispatch(actions.productActions.getListAll(data))
            const newData = [...data]
            setToDoList(newData);

            setShowList(true);
            setLoading(false);
            setPagination({
                totalDocs: response.metadata.count,
            });

        } catch (error) {
            history.replace('/');
        }
    };
    const changePage = (value: any) => {
        setPostList(value);
        fetchData(value)
    }

    useEffect(() => {


        fetchData(postList)
    }, [checkOnload])

    return (
        <div>
            <h3>Quản Lý Banner</h3>
            <ListData
                showList={showList}
                todoList={todoList}
                loading={loading}
                pagination={postList}
            />
            <MyPagination
                props={pagination}
                setPagination={changePage}
                setLoading={setLoading}
            />

            <ModalBanner />
        </div>
    )
}