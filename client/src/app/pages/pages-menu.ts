import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Sơ đồ khách sạn',
    icon: 'map-outline',
    link: '/pages/map-hotel',
    children: [
      {
        title: 'Quản lý phòng', 
        icon: 'list-room', 
        link: '/pages/list-room',
      }
    ],
  },
  {
    title: 'Khách sạn',
    icon: 'home-outline',
    link: '/pages/hotels',
  },
  {
    title: 'Loại phòng & giá',
    icon: 'layers-outline',
    // link: '/pages/room-price',
    children: [
      
      {
        title: 'Khách Hàng', // Tiêu đề mục con
        icon: 'add-outline', // Icon của mục con
        link: '../pages/user', // Đường dẫn của mục con
      },
      {
        title: 'Đặt phòng', 
        icon: 'add-outline', 
        link: '/pages/check-in',
      },
      {
        title: 'Trả phòng', 
        icon: 'add-outline', 
        link: '/pages/check-out',
      },
      
    ],
  },
  {
    title: 'Dịch vụ & kho',
    icon: 'cube-outline',
    link: '/pages/',
    children: [
      {
        title: 'Menu', // Tiêu đề mục con
        icon: 'add-outline', // Icon của mục con
        link: '../pages/menu', // Đường dẫn của mục con
      },
      {
        title: 'Trang phục', // Tiêu đề mục con
        icon: 'add-outline', // Icon của mục con
        link: '../pages/outfit', // Đường dẫn của mục con
      }
    ],
  },
  {
    title: 'Công nợ',
    icon: 'credit-outline',
    link: '/pages/credit',
  },
  {
    title: 'Tiền chi & tiền thu',
    icon: 'trending-up-outline',
    link: '/pages/expenditure',
  },
  {
    title: 'Doanh thu',
    icon: 'bar-chart-outline',
    link: '/pages/income',
  },
  {
    title: 'Thống kê',
    icon: 'pie-chart-outline', // Icon của mục menu
    children: [
      {
        title: 'Danh sách hóa đơn', // Tiêu đề mục con
        icon: 'list-outline', // Icon của mục con
        link: '/pages/bill-list', // Đường dẫn của mục con
      },
      {
        title: 'Kiểm tra $ tài khoản', // Tiêu đề mục con
        icon: 'credit-card-outline', // Icon của mục con
        link: '/pages/dashboard', // Đường dẫn của mục con
      },
      {
        title: 'Kết quả kinh doanh', // Tiêu đề mục con
        icon: 'trending-up-outline', // Icon của mục con
        link: '/pages/dashboard', // Đường dẫn của mục con
      },
      {
        title: 'Báo cáo', // Tiêu đề mục con
        icon: 'file-text-outline', // Icon của mục con
        link: '/pages/dashboard', // Đường dẫn của mục con
      },
      {
        title: 'Biểu đồ', // Tiêu đề mục con
        icon: 'file-text-outline', // Icon của mục con
        link: '/pages/chart', // Đường dẫn của mục con
      },
    ],
  },
];
