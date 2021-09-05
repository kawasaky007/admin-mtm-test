import { Form, Input, message, Modal } from "antd"
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import userService from "../../../../service/user/userService";


export default function DetailUser(
    {
    }
) {
    const [loading, setLoading] = useState(false);
    const data: any = useAppSelector(state => state.user.detailUser)
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const show: any = useAppSelector(state => state.form.show)
    const loadData: any = useAppSelector(state => state.form.loadData)
    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                setLoading(true);
                if (data) {
                    await userService.edit(data.id, {
                        user: values
                    });
                    // dispatch(actions.userActions.uploadUser(values))
                    message.success('Thay đổi thành công');
                } else {
                    // await api.createCategory(values);
                    message.success('Thêm thành công');
                }
                dispatch(actions.formActions.closeForm());
                form.resetFields();
                setLoading(false);
                dispatch(actions.formActions.changeLoad(!loadData))
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    const handleCancel = () => {
        dispatch(actions.formActions.closeForm())
    }

    const buttonLoading = loading ? (
        <LoadingOutlined>Loading</LoadingOutlined>
    ) : data ? (
        'Sửa'
    ) : (
        'Thêm'
    );
    useEffect(() => {
        const setForm = () => {
            if (data) {
                form.setFieldsValue({
                    full_name: data.full_name,
                    phone_number: data.phone_number
                })
            }


        }
        setForm()
    }, [data, loading])
    const title = {
        name: "Tên",
        phoneNumber: "Số điện thoại",

    }
    return (
        <>

            <Modal
                title={data ? 'Sửa Thông tin người dùng' : 'Thêm Thông tin người dùng'}
                visible={show}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={buttonLoading}
                cancelText="Hủy"
                forceRender
            >
                <Form
                    form={form}
                    // layout="vertical"
                    layout="inline"
                    name="basic"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="full_name"
                        label={title.name}
                        rules={[
                            {
                                required: true,
                                message: `Không được để trống ${title.name}`,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label={title.phoneNumber}
                        rules={[
                            {
                                required: true,
                                message: `Không được để trống ${title.phoneNumber}`,
                            },
                            {
                                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                                message: `${title.phoneNumber} không đúng`,

                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}