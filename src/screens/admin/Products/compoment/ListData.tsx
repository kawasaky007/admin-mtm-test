import { Image, Button, Table, Popconfirm, Card } from "antd";
import { useEffect, useRef, useState } from "react";
import { GIRD12, TEXTSEARCH } from "../../../../helper";
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import {
    DeleteOutlined,
    PlusOutlined,
    EditOutlined
} from '@ant-design/icons';
import Search from "antd/lib/input/Search";
import useDebounce from "../../../../hook/useDebonce";
import productService from "../../../../service/products/productService";
import { Route, Router, useHistory } from "react-router-dom";
import { AdminRouter } from "../../../../router/adminRouter";
export default function ListDataProduct({
    showList,
    todoList,
    loading,
    pagination,
}: any) {
    const loadData = useAppSelector(state => state.form.loadData)
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [search, setSearch] = useState('')
    async function handleDelete(item: any, index: any) {


        await productService.delete(item.id,)
        dispatch(actions.formActions.changeLoad(!loadData))
    }
    function cancel(e: any) {
        // message.error('Click on No');
    }
    function handleEdit(key: any) {
        dispatch(actions.formActions.showForm())
        dispatch(actions.productActions.setDetail(key));
    }
    const onSearch = (value: any) => console.log(value);
    const onChangeSearch = async (value: any) => {
        await setSearch(value.target.value);
        pagination.name = value.target.value

    }
    const debounceSearch = useDebounce<string>(search, 1000)

    useEffect(() => {
        dispatch(actions.formActions.changeLoad(!loadData))


    }, [debounceSearch])

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: GIRD12.COL1,
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: GIRD12.COL4,
            sorter: {
                compare: (a: any, b: any) => a.id - b.id,
                multiple: 2,
            },

        },
        {
            title: "Giá",
            dataIndex: 'price',
            key: 'price',
            width: GIRD12.COL2,
            render: (price: any) => {
                return (
                    <p>{new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND', }).format(price)}</p>
                )
            }
        },

        {
            title: "Ảnh",
            dataIndex: 'photo',
            key: 'photo',
            width: GIRD12.COL3,
            render: (photo: any) => {
                return <Image
                    style={{ height: 100 }}
                    src={photo} />;
            },
        },

        {
            render: (item: any) => {
                return (
                    <Button type="warning" danger onClick={() => handleEdit(item.id)}>
                        <EditOutlined className="antd-icon" />
                        Sửa
                    </Button>
                );
            },
            width: GIRD12.COL1,
        },
        {
            render: (item: any) => {
                return (
                    <div>
                        <Popconfirm
                            title={
                                `Bạn có muốn xoá ${item.name}`
                            }
                            onConfirm={() => handleDelete(item, item.stt)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <Button
                                type={'primary'}
                                danger
                                icon={<DeleteOutlined />}
                            >
                                {'Xoá'}
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
            width: GIRD12.COL1,
        }

    ]
    const data = showList
        ? todoList.map((item: any, index: any) => {

            return {
                id: item.id,
                key: index + 1,
                stt: index + 1,
                name: item.name,
                photo: item.photos[0].url,
                slug: item.slug,
                price: item.price.num
            };
        })
        : [];
    const getData = (pagination?: any) => {


        // 
        return data;
    };


    return (
        <div>
            <Card>
                <Search style={{ width: 400 }} onChange={onChangeSearch} placeholder={TEXTSEARCH} onSearch={onSearch} enterButton />
                <Button
                    type="success"
                    style={{
                        marginBottom: 16,
                    }}
                    icon={<PlusOutlined />}
                    onClick={() => {
                        dispatch(actions.formActions.showForm());
                        dispatch(actions.productActions.setDetail(null))
                    }}
                >
                    Thêm sản phẩm
                </Button>
            </Card>

            <Table
                className="components-table-demo-nested"
                scroll={{ x: true }}
                columns={columns}
                dataSource={getData(pagination)}
                pagination={false}
                loading={loading}
            // expandable={{ expandedRowRender }}
            />

        </div>
    )
}