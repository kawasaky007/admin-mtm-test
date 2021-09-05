import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    BookFilled,
    InfoCircleOutlined,
    SlidersOutlined,
    LineChartOutlined,
} from '@ant-design/icons';
import { AdminRouter } from '../../router/adminRouter';


export const MENU = [
    {
        id: 1,
        path: AdminRouter.USER.path,
        icon: UserOutlined,
        title: 'Quản lý người dùng',
        children: []
    },
    {
        id: 2,
        path: AdminRouter.CATEGORIES.path,
        icon: TeamOutlined,
        title: 'Quản lý Nhóm sản phẩm',
        children: []
    },
    {
        id: 3,
        path: AdminRouter.PRODUCTS.path,
        icon: PieChartOutlined,
        title: 'Quản lý sản phẩm',
        children: [
            {
                id: 31,
                title: "Tất cả sản phẩm",
                path: AdminRouter.PRODUCTS.path
            },
            {
                id: 32,
                title: "Sản phẩm nổi bật",
                path: AdminRouter.PRODUCTS_SALE.path
            },
        ]
    },
    {
        id: 4,
        path: AdminRouter.BANNERS.path,
        icon: SlidersOutlined,
        title: 'Quản lý Banner',
        children: []
    },
]