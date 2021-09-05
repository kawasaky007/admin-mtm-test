
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyPagination from "../../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import categoryService from "../../../service/category/categoryService";
import DetailCategory from "./components/DetailCategory";
import ListCategories from "./components/ListCategories";

export default function Categories() {
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
            const response: any = await categoryService.getAll(value);

            const { data } = response;
            dispatch(actions.categoryActions.getListAll(data))
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
            <h3>Quản Lý Nhóm sản phẩm</h3>
            <ListCategories
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
            <DetailCategory
            />
        </div>
    )
}