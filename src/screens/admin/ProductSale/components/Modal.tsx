import { Image, Form, Input, DatePicker, message, Modal, Select, Upload, Button, Spin } from "antd"
import { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import userService from "../../../../service/user/userService";
import categoryService from "../../../../service/category/categoryService";
import ColorPicker from "react-pick-color";
import moment from 'moment';
import ImgCrop from "antd-img-crop";
import globalService from "../../../../service/global/globalService";
import { CloudUploadOutlined } from '@ant-design/icons'
import { hide } from "yargs";
const { RangePicker } = DatePicker;

export default function ModalProductSale(
    {
    }
) {
    const [loading, setLoading] = useState(false);
    const data: any = useAppSelector(state => state.product.detailProductSale)
    const [file, setFile]: any = useState()
    const [form] = Form.useForm();
    const [startTime, setStartTime]: any = useState();
    const [endTime, setEndTime]: any = useState();
    const dispatch = useAppDispatch();
    const show: any = useAppSelector(state => state.form.show)
    const loadData: any = useAppSelector(state => state.form.loadData)
    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                console.log(startTime);

                setLoading(true);
                const formData = {
                    name: values.name,
                    slug: values.slug,
                    photo: file,

                }
                if (data) {

                    await categoryService.edit(data.id, {
                        flash_sale: formData
                    });
                    message.success('Thay đổi thành công 1');
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
    function formatDate(time: any) {
        const date = new Date(time);
        let month: any = (date.getMonth() + 1);
        let day: any = (date.getDate());
        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        return date.getFullYear() + '-' + day + '-' + month;
    }
    function range(start: any, end: any) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    function disabledDate(current: any) {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    function disabledRangeTime(_: any, type: any) {
        if (type === 'start') {
            return {
                disabledHours: () => range(0, 60).splice(4, 20),
                disabledMinutes: () => range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => range(0, 60).splice(20, 4),
            disabledMinutes: () => range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }
    const buttonLoading = loading ? (
        <LoadingOutlined>Loading</LoadingOutlined>
    ) : data ? (
        'Sửa'
    ) : (
        'Thêm'
    );
    useEffect(() => {
        form.resetFields();
        setFile(null);
        setEndTime(null);
        setStartTime(null)

        const setForm = () => {
            if (data) {
                form.setFieldsValue({
                    name: data.name,
                    slug: data.slug
                });
                setFile(data.photo)
                setStartTime(formatDate(data.active_time));
                console.log("test ok");

                setEndTime(formatDate(data.expired_time))
            }
        }


        if (data) {

            setForm();
        }

    }, [data])

    const title = {
        name: "Tên",
        slug: "Slug",
        photo: "Ảnh"


    }

    const onChangeFile = async (options: any) => {
        setLoading(true)
        const { onSuccess, onError, file, onProgress } = options;
        const fmData = new FormData();
        fmData.append('files[]', file);
        const data: any = await globalService.uploadFile(fmData);
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

                    <Form.Item>
                        <RangePicker
                            disabledDate={disabledDate}
                            disabledTime={disabledRangeTime}
                            value={[moment(startTime, "YYYY-DD-MM"), moment(endTime, "YYYY-DD-MM")]}
                            showTime={{
                                hideDisabledOptions: true,
                                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                            }}
                            format="DD-MM-YYYY HH:mm:ss"
                        />
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