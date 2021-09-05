import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import {
    LoginOutlined,
    EditOutlined,
    BellFilled,
    ProfileFilled,
    SettingOutlined,
} from '@ant-design/icons';

export default function HeaderProFile() {
    // const getProFile = useAppSelector((state) => state.showProfile.data);
    const getProFile = {
        name: 'Hoang An',
        avatar: 'https://truyenhinh.fpt.vn/wp-content/uploads/52426857_529098130918556_505237438482874368_n.jpg'
    }
    const [show, setShow] = useState(false);
    const history = useHistory();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (getProFile) {
            setShow(true);
        }
    });
    const logout = () => {
        dispatch(actions.authActions.logout());
    };
    const routerProfile = () => {
        history.replace('/admin/profile');
    };
    const menu: any = show ? (
        <Menu>
            <Menu.ItemGroup title={`Hi ${getProFile.name}`}>
                <Menu.Divider />
                <Menu.Item icon={<SettingOutlined />}>Setting</Menu.Item>
                <Menu.Item icon={<ProfileFilled />} onClick={routerProfile}>
                    Profile
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.Divider />
            <Menu.Item icon={<LoginOutlined />} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    ) : (
        ''
    );
    return (
        <div className="right">
            <div className="mr15">
                <Badge dot={true} offset={[-2, 0]}>
                    <a href="https://github.com/CT-HTrieu" style={{ color: '#000' }}>
                        <BellFilled />
                    </a>
                </Badge>
            </div>
            <div>
                <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
                    <div className="ant-dropdown-link">
                        <Avatar
                            src={show ? getProFile.avatar : ''}
                            alt="avatar"
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}