import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import {
    Row,
    Col,
    Avatar,
    Form,
    Input,
    Button,
    Card,
    Upload,
    message,
    Spin,
} from 'antd';
import './Profile.scss';

export default function Profile() {
    //   let history = useHistory();
    //   const dispatch = useDispatch();
    //   const getProFile = useSelector((state) => state.showProfile.data);
    //   const [profile, setProFile] = useState({});
    //   const [url, setUrl] = useState('');

    //   const [show, setShow] = useState(false);
    //   const [editPassword, setEditPassword] = useState(false);
    //   const [loadingAvatar, setLoadingAvatar] = useState(false);
    //   const [onSubmit, setOnSubmit] = useState(false);
    //   const [form] = Form.useForm();

    //   useEffect(() => {
    //     if (getProFile) {
    //       setProFile(getProFile);
    //       setUrl(getProFile.avatar);
    //       setShow(true);
    //       form.setFieldsValue({
    //         name: profile.name,
    //         phone: profile.phone,
    //       });
    //     } else {
    //       history.replace('/admin');
    //     }
    //   }, [show, getProFile]);
    //   const showUpdatePassword = () => {
    //     setEditPassword(!editPassword);
    //   };
    //   const layout = {
    //     labelCol: {
    //       span: 6,
    //     },
    //     wrapperCol: {
    //       span: 12,
    //     },
    //   };
    //   const fecthAuth = async (params) => {
    //     setOnSubmit(true);
    //     try {
    //       const response = await User.updateProfile(params);
    //       if (response) {
    //         const { data } = await User.getProFile();
    //         dispatch(showProfile(data));
    //       }
    //       message.success('Thay đổi thành công');
    //     } catch (error) {
    //       message.error('Thất bại mời xem lại');
    //     }
    //     setLoadingAvatar(false);
    //     setOnSubmit(false);
    //   };
    //   const onFinish = (e) => {
    //     if (!onSubmit) {
    //       const params = {
    //         avatar: url,
    //         phone: e.phone,
    //       };
    //       fecthAuth(params);
    //     }
    //   };
    //   const uploadImage = async (options) => {
    //     const { onSuccess, onError, file, onProgress } = options;
    //     const fmData = new FormData();
    //     fmData.append('files[]', file);
    //     setLoadingAvatar(true);
    //     const { data } = await UpAvatar(fmData);
    //     if (data[0]) {
    //       const params = {
    //         avatar: data[0],
    //         phone: profile.phone,
    //       };
    //       fecthAuth(params);
    //     }
    //   };
    //   const handleOnChange = ({ file, fileList, event }) => {};
    //   const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    //   return (
    //     <>
    //       {show ? (
    //         <div>
    //           <h2>User Profile</h2>
    //           <Row gutter={16}>
    //             <Col
    //               className="card-user-col"
    //               md={8}
    //               style={{ background: 'white' }}
    //               sm={24}
    //             >
    //               <div className="card-user">
    //                 <Upload
    //                   name="avatar"
    //                   accept="image/*"
    //                   customRequest={uploadImage}
    //                   onChange={handleOnChange}
    //                   showUploadList={false}
    //                 >
    //                   <Spin
    //                     indicator={antIcon}
    //                     spinning={loadingAvatar}
    //                     delay={500}
    //                   >
    //                     <Avatar
    //                       className="Profile-avatar"
    //                       size={150}
    //                       src={url}
    //                       style={{ cursor: 'pointer' }}
    //                     />
    //                   </Spin>
    //                 </Upload>
    //                 <h2>{profile.role}</h2>
    //                 <Button type="primary" onClick={showUpdatePassword}>
    //                   Update password
    //                 </Button>
    //               </div>
    //               {editPassword ? (
    //                 <Changepassword showUpdatePassword={showUpdatePassword} />
    //               ) : (
    //                 ''
    //               )}
    //             </Col>
    //             <Col className="card-user-col" md={16} sm={24}>
    //               <Card title="Account Details">
    //                 <Form
    //                   {...layout}
    //                   name="nest-messages"
    //                   onFinish={onFinish}
    //                   initialValues={{ name: profile.name, phone: profile.phone }}
    //                 >
    //                   <Form.Item
    //                     label="Email"
    //                     rules={[
    //                       {
    //                         type: 'email',
    //                       },
    //                     ]}
    //                   >
    //                     <Input value={profile.email} disabled />
    //                   </Form.Item>
    //                   <Form.Item name="name" label="User name">
    //                     <Input disabled />
    //                   </Form.Item>
    //                   <Form.Item
    //                     name="phone"
    //                     label="Phone"
    //                     wrapperCol={{ span: '8' }}
    //                     rules={[
    //                       {
    //                         message: 'Nhập vào phải là số',
    //                         pattern: /^[0-9]+$/,
    //                       },
    //                       {
    //                         len: 10,
    //                         message:'Phải đủ 10 số',
    //                       },
    //                     ]}
    //                   >
    //                     <Input />
    //                   </Form.Item>
    //                   <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
    //                     <Button type="primary" htmlType="submit">
    //                       {onSubmit ? <LoadingOutlined /> : 'Save'}
    //                     </Button>
    //                   </Form.Item>
    //                 </Form>
    //               </Card>
    //             </Col>
    //           </Row>
    //         </div>
    //       ) : (
    //         ''
    //       )}
    //     </>
    //   );
}
