import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import salesService from "../../../service/sales/salesService";
import ListDataProductSale from "./components/ListData";
import ModalProductSale from "./components/Modal";
import './Sales.scss'

export default function ProductSale() {
    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState({ page: 1, per_page: 10, popup: false });

    const [todoList, setToDoList] = useState();
    const [pagination, setPagination] = useState({});
    const dispatch = useAppDispatch();
    const history = useHistory()
    const fetchData = async (value: any) => {
        try {
            setLoading(true);
            const response: any = await salesService.getAll(value);

            const { data } = response;
            dispatch(actions.productActions.getListProductSale(data))
            const newData: any = [...data]
            setToDoList(newData);

            setLoading(false);
            setPagination({
                totalDocs: response.metadata.count,
            });

        } catch (error) {
            history.replace('/');
        }
    };
    useEffect(() => {
        fetchData(postList)
    }, [])
    return (
        <div style={{ padding: 20 }}>
            <ListDataProductSale
                loading={loading}
                listData={todoList}
            />
            <ModalProductSale />
        </div>
    )
}