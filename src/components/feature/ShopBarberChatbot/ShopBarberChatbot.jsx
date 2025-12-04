// src/components/ShopBarberChatbot.jsx
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { getStore } from '~/services/storeServices';
import { getService } from '~/services/serviceServices';

// Theme chatbot
const theme = {
  background: '#f5f8fb',
  headerBgColor: '#5C3317',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#A89278',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

// Component async hiển thị danh sách Store
const AsyncStoreList = ({ triggerNextStep }) => {
  const [stores, setStores] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let called = false; // để đảm bảo triggerNextStep chỉ gọi 1 lần
    const fetchStores = async () => {
      try {
        const data = await getStore();
        setStores(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        if (!called) {
          triggerNextStep();
          called = true;
        }
      }
    };
    fetchStores();
  }, [triggerNextStep]);

  if (loading) return <div>Đang tải danh sách cơ sở...</div>;

  return (
    <div>
      {stores.length > 0 ? (
        stores.map((store, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {index + 1}. {store.storeName} - {store.addressID || 'Chưa cập nhật'}
            <br />
            Giờ hoạt động: {store.workingHourID || 'Chưa cập nhật'}
            <br />
            SĐT: {store.numberphone || 'Chưa có'}
          </div>
        ))
      ) : (
        <div>Hiện chưa có dữ liệu cơ sở.</div>
      )}
    </div>
  );
};

// Component async hiển thị danh sách Service
const AsyncServiceList = ({ triggerNextStep }) => {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let called = false;
    const fetchServices = async () => {
      try {
        const data = await getService();
        setServices(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        if (!called) {
          triggerNextStep();
          called = true;
        }
      }
    };
    fetchServices();
  }, [triggerNextStep]);

  if (loading) return <div>Đang tải danh sách dịch vụ...</div>;

  return (
    <div>
      {services.length > 0 ? (
        services.map((service, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            - {service.serName}: {service.serPrice} VNĐ
            <br />
            ({service.serDescription || 'Chưa có mô tả'})
          </div>
        ))
      ) : (
        <div>Hiện chưa có dữ liệu dịch vụ.</div>
      )}
    </div>
  );
};

const ShopBarberChatbot = () => {
  const steps = [
    {
      id: '1',
      message:
        'Chào mừng bạn đến với ShopBarber! Tôi là trợ lý ảo, rất sẵn lòng giúp bạn. Bạn cần tìm thông tin gì hôm nay?',
      trigger: 'menu_chinh',
    },
    {
      id: 'menu_chinh',
      options: [
        { value: 'co_so', label: '📍 Địa chỉ & Giờ làm việc', trigger: 'info_coso' },
        { value: 'gia', label: '💰 Bảng giá Dịch vụ', trigger: 'info_giathanh' },
        { value: 'dat_lich', label: '🗓️ Đặt lịch hẹn ngay', trigger: 'dat_lich' },
      ],
    },
    {
      id: 'info_coso',
      component: <AsyncStoreList />,
      asMessage: true,
      waitAction: true, // đảm bảo triggerNextStep chỉ thực hiện sau load xong
      trigger: 'hoi_tiep',
    },
    {
      id: 'info_giathanh',
      component: <AsyncServiceList />,
      asMessage: true,
      waitAction: true,
      trigger: 'hoi_tiep',
    },
    {
      id: 'dat_lich',
      message:
        'Bạn có thể đặt lịch hẹn dễ dàng qua liên kết sau hoặc gọi hotline:\n\n📞 Hotline: 0901 234 567\n🔗 Đặt lịch trực tuyến: [Click để đặt lịch](https://link-dat-lich-cua-shopbarber.com)',
      trigger: 'hoi_tiep',
    },
    {
      id: 'hoi_tiep',
      message: 'Bạn còn muốn xem thông tin nào khác không?',
      trigger: 'options_hoi_tiep',
    },
    {
      id: 'options_hoi_tiep',
      options: [
        { value: 'back', label: 'Quay lại Menu chính', trigger: 'menu_chinh' },
        { value: 'end', label: 'Tôi đã rõ, cảm ơn!', trigger: 'ket_thuc' },
      ],
    },
    {
      id: 'ket_thuc',
      message: 'Cảm ơn bạn đã ghé thăm ShopBarber. Hẹn gặp lại bạn sớm nhất!',
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle="💈 Trợ lý ảo ShopBarber"
        floating={true}
        steps={steps}
        width="350px"
        height="450px"
      />
    </ThemeProvider>
  );
};

export default ShopBarberChatbot;
