import { Button, Collapse, Popconfirm } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    Loading3QuartersOutlined,
} from '@ant-design/icons';
import Content from "./Content";
const { Panel } = Collapse;
export default function ListDataProductSale({
    loading,
    listData
}: any
) {

    const dispatch = useAppDispatch();
    async function confirm(e: any) {
        // await Promise.all(questions.map((item) => api.remove(item._id)));
        // message.success('Xoá thành công');
        // setReload((prev) => !prev);
    }
    async function remove(item: any) {

    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                }}
            >
                {!loading && (
                    <Button
                        type="primary"
                        style={{
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => dispatch(actions.formActions.showForm())}
                    >
                        <PlusOutlined />
                        Thêm nhóm khuyến mãi
                    </Button>
                )}
                {!loading && (
                    <Popconfirm
                        title="Xoá tất cả khuyến mãi ? "
                        onConfirm={confirm}
                        onCancel={(e) => {

                        }}
                        okText="Yes"
                        cancelText="No"
                        placement="left"
                    >
                        <Button type="primary" danger style={{ borderRadius: 5 }}>
                            Xoá tất cả
                        </Button>
                    </Popconfirm>
                )}
            </div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loading3QuartersOutlined
                        spin
                        style={{
                            fontSize: 40,
                            color: 'rgb(65,145,247)',
                            textAlign: 'center',
                        }}
                    />
                </div>
            ) : (
                <>
                    {
                        listData ?
                            (
                                <Collapse
                                    bordered
                                    style={{ borderRadius: 5 }}
                                    expandIconPosition="right"
                                >
                                    {listData.map((item: any) => {
                                        return (
                                            <Panel
                                                className={!item.active ? 'header-title' : ''}
                                                header={`${item.active ? item.name : `${item.name} (Đã kết thúc)`}`}

                                                key={item.id}
                                            >
                                                <div style={{ padding: '0 10px' }}>
                                                    <Content
                                                        item={item}
                                                    />
                                                </div>
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            )
                            : (
                                <>
                                    <h3>Không Có Giảm giá</h3>
                                </>
                            )
                    }
                </>
            )}
        </div >
    )
}