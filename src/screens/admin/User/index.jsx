import ListUser from "./components/ListUser";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import userService from "../../../service/user/userService";
import MyPagination from "../../../components/Pagination";
import { Input } from 'antd';
import { TEXTSEARCH } from "../../../helper";
import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import DetailUser from "./components/DetailUser";


const { Search } = Input;
export default function User() {
    const [todoList, setToDoList] = useState({});
    const [postList, setPostList] = useState({ page: 1, per_page: 10 });
    const [pagination, setPagination] = useState({});
    const [showList, setShowList] = useState(false);
    const checkOnload = useAppSelector((state) => state.form.loadData);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const fecthUserPage = async (value) => {
        try {
            setLoading(true);
            const response = await userService.getAll(value);

            const { data } = response;
            dispatch(actions.userActions.getListUser(data))

            setToDoList(data);

            setShowList(true);
            setLoading(false);
            setPagination({
                totalDocs: response.metadata.count,
            });

        } catch (error) {
            history.replace('/');
        }
    };
    const changePage = (value) => {
        setPostList(value);
        fecthUserPage(value)
    }
    const onSearch = (value) => console.log(value);

    useEffect(() => {


        fecthUserPage(postList)
    }, [checkOnload, postList])
    return (
        <div>
            <h3>Quản Lý Khách Hàng</h3>

            <ListUser
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
            <DetailUser
            />
        </div>
    )
}