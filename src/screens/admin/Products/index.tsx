import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import MyPagination from "../../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import productService from "../../../service/products/productService";
import ListDataProduct from "./compoment/ListData";
import ModalProduct from "./compoment/Modal";

export default function Products() {
    const [todoList, setToDoList] = useState({});
    const [postList, setPostList] = useState({ page: 1, per_page: 10 });
    const [pagination, setPagination] = useState({});
    const [showList, setShowList] = useState(false);
    const checkOnload = useAppSelector((state) => state.form.loadData);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const fetchData = async (value: any) => {
        try {
            setLoading(true);
            const response: any = await productService.getAll(value);
            console.log(response);

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
            <h3>Quản Lý sản phẩm</h3>
            <ListDataProduct
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

            <ModalProduct />
        </div>
    )
}