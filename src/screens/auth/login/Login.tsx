import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Form, Input, message, notification, Spin } from "antd";
import auth from "../../../service/auth/authService";
import Button from "antd-button-color";
import './Login.scss'
import { LoadingOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import authService from "../../../service/auth/authService";

function Login() {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token)
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        if (token) {
            history.push('/admin')
        }
        else {
            history.push('/');
            openNotification();
        }
    }, []);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const openNotification = () => {
        const args = {
            message: 'Đăng nhập Admin',
            description: 'Xin mời đăng nhập',
            duration: 2,
        };
        notification.success(args);
    };
    const onFinish = (values: any) => {


        const fecthAuth = async () => {
            setLoading(true)
            try {
                console.log("tesrt");

                const response: any = await authService.login(values)


                dispatch(actions.authActions.Login(response.data.token))


                // localStorage.setItem('Bearer', `Bearer ${response.access_token}`);
                // setToken(response.access_token);
                // dispatch(loginSuccess(token));
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
                history.replace('/admin');
                message.success('Đăng nhập thành công');
            } catch (error) {
                // console.log(error);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);

                // message.error('Tên đăng nhập hoặc mật khẩu bị sai');
            }
        };
        fecthAuth();
        // dispatch(actions.authActions.clickAdd('Akkk'));
        // history.replace('/admin')
    };

    return (
        <div>
            <div className="Home">

                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <h2>Login</h2>

                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}

                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Spin indicator={antIcon}
                                    spinning={loading}>
                                    <Button type="primary" htmlType="submit">
                                        Login
                                    </Button>
                                </Spin>

                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;