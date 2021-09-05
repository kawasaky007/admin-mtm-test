import { Space, Image, Tag, Button } from "antd";
import {
    StopOutlined,
    EditOutlined,
    Loading3QuartersOutlined,
} from '@ant-design/icons';
import default_img from '../../../../assets/img/default.png'
import { useAppDispatch } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";

export default function Content({
    item
}: any) {
    const dispatch = useAppDispatch();
    function formatData(time: any) {
        const date = new Date(time);
        let month: any = (date.getMonth() + 1);
        let day: any = (date.getDate());
        let hours: any = date.getHours();
        let minutes: any = date.getMinutes();
        let second: any = date.getSeconds();


        // 
        if (hours < 10)
            hours = '0' + hours;
        if (minutes < 10)
            minutes = '0' + minutes;
        if (second < 10)
            second = '0' + second;
        if (month < 10)
            month = '0' + month;
        if (day < 10)
            day = '0' + day;
        return day + "/" + month + "/" + date.getFullYear() + ' || ' + hours + ':' + minutes + ':' + second;
    }
    return (

        <div>
            <Space size={12}>
                <Image

                    width={200}
                    src={item.photo ? item.photo : default_img}

                />
                <Tag
                    color={item.active ? 'cyan' : 'red'}
                >
                    {` Thời gian kết thúc ${formatData(item.expired_time)}`}
                </Tag>
                <Space>
                    <Button
                        type="warning"
                        style={{
                            borderRadius: 5,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={() => {
                            dispatch(actions.formActions.showForm());
                            dispatch(actions.productActions.setDetailSales(item.id))
                        }}
                    >
                        <EditOutlined />
                        Sửa
                    </Button>
                    {
                        item.active &&
                        <Button
                            type="danger"
                            style={{
                                borderRadius: 5,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={() => { }}
                        >
                            <StopOutlined />
                            Kết Thúc
                        </Button>
                    }
                </Space>
            </Space>
        </div >
    )
}