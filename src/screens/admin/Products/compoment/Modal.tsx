import { Form, Input, Image, message, Button, Modal, Select, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined, CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from "antd-img-crop";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import productService from "../../../../service/products/productService";
import categoryService from "../../../../service/category/categoryService";
import globalService from "../../../../service/global/globalService";
import { url } from "inspector";
const { Option } = Select;
export default function ModalBanner() {

    const [loading, setLoading] = useState(false);
    const dataItem: any = useAppSelector(state => state.product.detail)
    const [dataDetail, setDataDetail]: any = useState();
    const [fileList, setFileList]: any = useState([]);
    const [listCategoryFull, setListCategoryFull] = useState([])
    const [selectedValue, setSelectedValue]: any = useState([])
    const [form] = Form.useForm();
    const dispatch = useAppDispatch()
    const show: any = useAppSelector(state => state.form.show)
    const loadData: any = useAppSelector(state => state.form.loadData)

    const handleOk = () => {
        console.log(fileList);

        form
            .validateFields()
            .then(async (values) => {
                setLoading(true);
                // const formData = {
                //     name: values.name,
                //     slug: values.slug,
                //     parent_id: selectedValue,
                //     photo: file

                // }
                if (dataItem) {
                    console.log(values);

                    await productService.edit(dataItem.id, {
                        product: {
                            name: values.name,
                            categories: selectedValue,
                            details: dataDetail,
                            photo_attributes: fileList.map((item: any) => {
                                delete item.uid;
                                return {
                                    url: item.url
                                }

                            }),
                            price: values.price,
                            discount: values.discount / 100,
                            code: values.code
                        }
                    });
                    message.success('Thay đổi thành công');
                } else {
                    await productService.create({
                        product: {
                            name: values.name,
                            categories: selectedValue,
                            photo_attributes: fileList.map((item: any) => {
                                delete item.uid;
                                return {
                                    url: item.url
                                }

                            }),
                            price: values.price,
                            discount: values.discount / 100,
                            code: values.code
                        }
                    });
                    message.success('Thêm thành công');
                }

                dispatch(actions.formActions.closeForm());
                form.resetFields();
                setFileList([]);
                setSelectedValue([]);
                setDataDetail('');
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
    ) : dataItem ? (
        'Sửa'
    ) : (
        'Thêm'
    );
    useEffect(() => {
        const fetchData = async () => {
            const { data }: any = await productService.getDetail(dataItem.id);

            setDataDetail(data.details)
        }
        form.resetFields();
        setFileList([]);
        setSelectedValue([])

        const getData = async () => {
            const { data } = await categoryService.getAll({
                page: 1,
                per_page: 1000,
                nested: false
            })
            setListCategoryFull(data);
            console.log(data);

        }
        const setForm = () => {
            if (dataItem) {

                form.setFieldsValue({
                    name: dataItem.name,
                    slug: dataItem.slug,
                    price: dataItem.price.num,
                    discount: dataItem.discount.num * 100,
                    code: dataItem.code,
                    details: dataDetail


                })
                setSelectedValue(dataItem.categories.map((item: any) => item.id));
                const listPhoto = [];
                for (let i = 0; i < dataItem.photos.length; i++) {
                    listPhoto.push({
                        uid: i.toString(),
                        url: dataItem.photos[i].url
                    })
                }

                setFileList(listPhoto);
            }
            else {

            }

        }

        if (listCategoryFull.length <= 0)
            getData()
        if (dataItem) {
            setForm();
            fetchData();
        }

    }, [dataItem])

    const title = {
        name: "Tên",
        parent_id: "Loại sản phẩm",
        slug: "Slug",
        photo: "Ảnh",
        price: 'Giá',
        code: 'Mã Sản Phẩm',
        discount: "Giảm giá (%)",
        desperation: "Mô tả"


    }

    const customerRequest = async (options: any) => {
        setLoading(true)
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        fmData.append('files[]', file);
        const data: any = await globalService.uploadFile(fmData);
        fileList[fileList.length - 1] = {
            uid: fileList[fileList.length - 1].uid,
            url: data.data[0]
        }
        setFileList(fileList)

        setLoading(false)

    };

    const onChange = ({ fileList: newFileList }: any) => {
        // console.log(fileList[fileList.length - 1]);
        // fileList[fileList.length-1]={
        //     uid: fileList[fileList.length-1]
        // }
        // let dataFake={
        //     uid:fileList[fileList.length-1],
        //     url: uid: fileList[fileList.length-1]
        // }
        setFileList(newFileList);
    };
    const ChangeListCategory = (e: any) => {
        console.log(e);

        setSelectedValue(e);

    }

    return (

        <>
            <Modal
                title={dataItem ? 'Sửa Thông tin nhóm sản phẩm' : 'Thêm Thông tin nhóm sản phẩm'}
                visible={show}
                style={{ minWidth: '70vw' }}
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
                        style={{ width: '300px' }}
                        name="price"
                        label={title.price}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '300px' }}
                        name="discount"
                        label={title.discount}

                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ width: '300px' }}
                        name="code"
                        label={title.code}

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
                            mode="multiple"
                            value={selectedValue}
                            style={{ width: 200 }}
                            placeholder="Select a Category"
                            optionFilterProp="children"
                            onChange={ChangeListCategory}
                            filterOption={(input, option: any) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }

                        >
                            <Option value={0}>
                                {'Không có'}
                            </Option>
                            {options}
                        </Select>,
                    </Form.Item>
                    <Form.Item
                        name="desperation"
                        label={title.desperation}
                    >
                        <CKEditor
                            editor={ClassicEditor}
                            data={dataDetail}
                            onReady={(editor: any) => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                console.log(data);

                                setDataDetail(data);
                            }}
                        // onBlur={(event, editor) => {
                        //     // console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     // console.log('Focu 1s.', editor);
                        // }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={title.photo}
                        hasFeedback
                        style={{ display: 'flex', alignItems: 'center' }}

                    >
                        <ImgCrop >
                            <Upload
                                customRequest={customerRequest}
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                            >
                                {"+ Upload"}
                            </Upload>
                        </ImgCrop>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}