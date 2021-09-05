import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from '../../../src/assets/img/logo.png'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    BookFilled,
    InfoCircleOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import React from "react";
import './index.scss'
import HeaderProFile from "../../assets/scss/headerProfile";
import { MENU } from "./menu";
const { SubMenu } = Menu;


export default function SiderDemo({ children }: any) {
    const history = useHistory();
    const dispatch = useDispatch();
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [exercises, setExercises] = useState([]);
    const menu = MENU;
    const toggle = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        (async () => {
            // const data = await api.getAll();
            // setExercises([...data.filter((item) => item.name !== 'Test cuối khoá')]);
        })();
    }, []);
    useEffect(() => {
        const fecthUserProfile = async () => {
            // try {
            //   const { data } = await User.getProFile();
            //   dispatch(showProfile(data));
            // } catch (error) {
            //   if (error.response.status === 401) {
            //     dispatch(logOut());
            //   }
            // }
        };
        fecthUserProfile();
    }, []);
    return (
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed} width="250">
                <div className="logo">
                    <img src={logo} alt="" className="img-responsive" />
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {
                        menu.map(item => {

                            return (
                                <>
                                    {item.children.length <= 0 &&
                                        <Menu.Item
                                            key={item.id}
                                            icon={<item.icon />}
                                            onClick={() => history.push(`${item.path}`)}
                                        >
                                            {item.title}

                                        </Menu.Item>
                                    }
                                    {
                                        item.children.length > 0 &&
                                        <SubMenu
                                            title={item.title}
                                            key={item.id}
                                            icon={<item.icon />}
                                        >

                                            {
                                                item.children.map(children => {
                                                    return (
                                                        <Menu.Item
                                                            key={children.id}
                                                            onClick={() => history.push(`${children.path}`)}
                                                        >
                                                            {children.title}
                                                        </Menu.Item>
                                                    )
                                                })
                                            }

                                        </SubMenu>
                                    }
                                </>
                            )
                        })
                    }


                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background header"
                    style={{ padding: 0 }}
                >
                    <div className="left">
                        {React.createElement(
                            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                            {
                                className: 'trigger',
                                onClick: toggle,
                            }
                        )}
                    </div>
                    <HeaderProFile />
                </Header>
                <Content className="site-layout-background">{children}</Content>
            </Layout>
        </Layout>
    );
}