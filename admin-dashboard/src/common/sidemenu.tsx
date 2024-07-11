import { IoGridOutline } from 'react-icons/io5';
import { LiaUserAstronautSolid } from 'react-icons/lia';
import { FiUsers } from 'react-icons/fi';

export const MENUITEMS = [
  {
    menutitle: 'Main',
    Items: [
      {
        title: "Dashboard",
        icon: (
        <IoGridOutline size={15} color="#000000"/>
        ),
        type: "link",
        path: "/dashboard",
        selected:false,
        active:false,
      },
      {
        title: 'Customers',
        icon: <FiUsers size={15} color="#000000" />,
        path: '/customer-list',
        type: 'link',
        selected: false,
        active: false,
        // children: [
        //   {
        //     path: '/customer-list',
        //     type: 'link',
        //     active: false,
        //     selected: false,
        //     title: 'Customer List',
        //   },
        // ],
      },
      {
        title: 'Appointments',
        icon: <FiUsers size={15} color="#000000" />,
        path: '/customer-list',
        type: 'link',
        selected: false,
        active: false,
        // children: [
        //   {
        //     path: '/customer-list',
        //     type: 'link',
        //     active: false,
        //     selected: false,
        //     title: 'Customer List',
        //   },
        // ],
      },
      {
        title: 'Listings',
        icon: <LiaUserAstronautSolid size={15} color="#000000" />,
        path: '/listings',
        type: 'link',
        selected: false,
        active: false,
        // children: [
        //   {
        //     path: '/customer-list',
        //     type: 'link',
        //     active: false,
        //     selected: false,
        //     title: 'Customer List',
        //   },
        // ],
      },
      
    ],
  },
];
