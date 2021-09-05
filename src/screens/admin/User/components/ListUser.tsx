import { Avatar, Badge, Space, message, Table, Popconfirm, Button } from "antd";
import {
    DeleteOutlined,
    LockOutlined,
    UnlockOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import { useEffect, useState } from "react";
import { GIRD, TEXTSEARCH } from "../../../../helper";
import userService from "../../../../service/user/userService";
import useDebounce from "../../../../hook/useDebonce";
import Search from "antd/lib/input/Search";
export default function ListUser(
    {
        showList,
        todoList,
        loading,
        pagination,
    }: any

) {
    const loadData = useAppSelector(state => state.form.loadData)
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const onSearch = (value: any) => console.log(value);
    const onChangeSearch = async (value: any) => {
        await setSearch(value.target.value);
        pagination.full_name = value.target.value;
        pagination.email = value.target.value;
        pagination.phone_number = value.target.value;

    }
    const debounceSearch = useDebounce<string>(search, 1000)
    useEffect(() => {
        dispatch(actions.formActions.changeLoad(!loadData))
    }, [debounceSearch])
    async function confirmStatus(item: any, index: any) {


        await userService.edit(item.id, {
            user: {
                resgistation_activated: !item.status
            }
        })
        dispatch(actions.formActions.changeLoad(!loadData))
    }
    function cancel(e: any) {
        // message.error('Click on No');
    }
    function handleEdit(key: any) {
        dispatch(actions.formActions.showForm())
        dispatch(actions.userActions.getDetailUser(key));
    }
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: GIRD.COL2,
        },
        {
            title: 'Tên',
            dataIndex: 'fullName',
            key: 'fullName',
            width: GIRD.COL5,
            sorter: {
                compare: (a: any, b: any) => a.id - b.id,
                multiple: 2,
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: GIRD.COL5,
            sorter: {
                compare: (a: any, b: any) => a.email - b.email,
                multiple: 3,
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: GIRD.COL5,
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: any) => {
                return <Avatar src={avatar} />;
            },
            width: GIRD.COL4,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: any, item: any) => {
                return (
                    <div>
                        <Popconfirm
                            title={
                                status ? 'Khóa người dùng này ?' : 'Kích hoạt người dùng này ?'
                            }
                            onConfirm={() => confirmStatus(item, item.stt)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                            placement="left"
                        >
                            <Button
                                style={{ minWidth: 190 }}
                                type={status ? 'success' : 'primary'}
                                danger
                                icon={status ? <UnlockOutlined /> : <LockOutlined />}
                            >
                                {status ? 'Đang hoạt động' : 'Đã Khoá'}
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
            width: GIRD.COL2,
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
            width: GIRD.COL2,
        }

    ]
    const data = showList
        ? todoList.map((item: any, index: any) => {

            return {
                id: item.id,
                key: index + 1,
                stt: index + 1,
                role: item.role,
                fullName: item.full_name,
                email: item.email,
                phone: item.phone_number,
                avatar: item.photo.url,
                status: item.resgistation_activated,
            };
        })
        : [];
    const getData = (pagination?: any) => {
        return data;
    };

    const expandedRowRender = () => {
        const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            {
                title: 'Status',
                key: 'state',
                render: () => (
                    <span>
                        <Badge status="success" />
                        Finished
                    </span>
                ),
            },
            { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <Space size="middle">
                        <a>Pause</a>
                        <a>Stop</a>
                    </Space>
                ),
            },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };
    return (
        <div>
            <Search style={{ width: 400 }} onChange={onChangeSearch} placeholder={TEXTSEARCH} onSearch={onSearch} enterButton />

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