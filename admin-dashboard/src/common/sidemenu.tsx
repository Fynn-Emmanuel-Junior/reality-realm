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
        icon: <LiaUserAstronautSolid size={15} color="#000000" />,
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
        title: 'Guarantors',
        icon: <LiaUserAstronautSolid size={15} color="#000000" />,
        path: '/guarantor-list',
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
      // {
      //   title: "Other",
      //   icon: (
      //    <MdOutlineInventory size={15} color="#000000"/>
      //   ),
      //   type: "sub",
      //   selected:false,
      //   active:false,
      //   children: [
      //     {
      //       title: "Smart Inventory",
      //       type: "sub",
      //       selected:false,
      //       active:false,
      //       children: [
      //         {
      //           path: '/distributors-list',
      //           title: "View Distributors list",
      //           type: "link",
      //           active:false,
      //           selected:false,
      //         }
      //       ],
      //     },
      //   ],
      // }
    ],
  },
];
