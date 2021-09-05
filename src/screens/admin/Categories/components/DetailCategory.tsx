import { Image, Form, Input, message, Modal, Select, Upload, Button, Spin } from "antd"
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import userService from "../../../../service/user/userService";
import categoryService from "../../../../service/category/categoryService";
import ColorPicker from "react-pick-color";
import ImgCrop from "antd-img-crop";
import globalService from "../../../../service/global/globalService";
import { CloudUploadOutlined } from '@ant-design/icons'
import './DetailCategory.scss'
import { hide } from "yargs";
const { Option } = Select;

export default function DetailCategory(
    {
    }
) {
    const [loading, setLoading] = useState(false);
    const data: any = useAppSelector(state => state.category.detail)
    const [color, setColor] = useState('#333');
    const [file, setFile]: any = useState()
    const [listCategoryFull, setListCategoryFull] = useState([])
    const [selectedValue, setSelectedValue]: any = useState()
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const show: any = useAppSelector(state => state.form.show)
    const loadData: any = useAppSelector(state => state.form.loadData)
    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                setLoading(true);
                const formData = {
                    name: values.name,
                    slug: values.slug,
                    parent_id: selectedValue,
                    color: color,
                    photo: file

                }
                if (data) {

                    await categoryService.edit(data.id, {
                        category: formData
                    });
                    message.success('Thay đổi thành công');
                } else {
                    await categoryService.create(formData)
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
    const options = listCategoryFull.map((item: any) => {
        return (
            <Option key={item.id} value={item.id}>
                {item.name}
            </Option>
        );
    });
    const buttonLoading = loading ? (
        <LoadingOutlined>Loading</LoadingOutlined>
    ) : data ? (
        'Sửa'
    ) : (
        'Thêm'
    );
    useEffect(() => {
        form.resetFields();
        setColor('#fff');
        setFile(null)
        const getData = async () => {
            const { data } = await categoryService.getAll({
                page: 1,
                per_page: 1000,
                nested: false
            })
            setListCategoryFull(data);
        }
        const setForm = () => {
            if (data) {
                form.setFieldsValue({
                    name: data.name,
                    slug: data.slug
                })
                setSelectedValue(data.parent_id);
                setColor(data.color);
                setFile(data.photo)
            }
        }

        if (listCategoryFull.length <= 0)
            getData()
        if (data) {
            setForm();
        }

    }, [data])

    const title = {
        name: "Tên",
        color: "Màu",
        icon: "Icon",
        parent_id: "Loại cha",
        slug: "Slug",
        photo: "Ảnh"


    }

    const onChangeFile = async (options: any) => {
        setLoading(true)
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        fmData.append('files[]', file);
        const data: any = await globalService.uploadFile(fmData);
        console.log(data.data);
        setFile(data.data[0])
        setLoading(false)

    };
    const onChange = async ({ file: fileList }: any) => {
        console.log(fileList);
        fileList.status = 'done'

    };

    return (
        <>

            <Modal
                title={data ? 'Sửa Thông tin nhóm sản phẩm' : 'Thêm Thông tin nhóm sản phẩm'}
                visible={show}
                onOk={handleOk}
                onCancel={handleCancel}
                okText={buttonLoading}
                cancelText="Hủy"
                forceRender
            >
                <Form
                    form={form}
                    layout="horizontal"
                    // layout="basic"
                    name="basic"
                    initialValues={{ modifier: 'public' }}
                >
                    <Form.Item
                        name="name"
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
                        name="slug"
                        label={title.slug}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        hasFeedback
                        label={title.parent_id}
                    // rules={[{ required: true, message: 'Please select your country!' }]}
                    >
                        <Select
                            showSearch
                            value={selectedValue}
                            style={{ width: 200 }}
                            placeholder="Select a Category"
                            optionFilterProp="children"
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value: any) => value != 0 ? setSelectedValue(value) : setSelectedValue(null)}
                        >
                            <Option value={0}>
                                {'Không có'}
                            </Option>
                            {options}
                        </Select>,
                    </Form.Item>
                    <Form.Item
                        hasFeedback
                        label={title.color}
                    >
                        <ColorPicker color={color} onChange={(color: any) => setColor(color.hex)} />
                    </Form.Item>
                    <Form.Item
                        className="update-customer"
                        label={title.photo}
                        hasFeedback
                        style={{ display: 'flex', alignItems: 'center' }}

                    >
                        <Image
                            width={200}
                            src={file}
                            style={{ cursor: 'pointer' }}
                        />
                        <ImgCrop
                            aspect={16 / 9}
                        >
                            <Upload
                                // showUploadList={false}

                                name='file'
                                accept="image/*"
                                multiple={false}
                                showUploadList={{
                                    showDownloadIcon: true,
                                    removeIcon: true
                                }}
                                progress={
                                    {
                                        strokeColor: 'red'
                                    }
                                }
                                onChange={onChange}
                                customRequest={onChangeFile}
                            >
                                <Spin delay={500} spinning={loading}>
                                    <Button
                                        style={{ marginLeft: 10 }}
                                        type={'primary'}
                                        ghost
                                        icon={<CloudUploadOutlined />}
                                    >
                                        {data ? 'Sửa Ảnh' : "Thêm Ảnh"}
                                    </Button>
                                </Spin>
                            </Upload>
                        </ImgCrop>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}