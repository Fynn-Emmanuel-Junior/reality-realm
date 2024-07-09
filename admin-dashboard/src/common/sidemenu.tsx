import { IoCashOutline } from 'react-icons/io5';
import { MdOutlineApproval } from 'react-icons/md';
import { LiaUserAstronautSolid } from 'react-icons/lia';
import { FiUsers } from 'react-icons/fi';

export const MENUITEMS = [
  {
    menutitle: 'Main',
    Items: [
      // {
      //   title: "Dashboard",
      //   icon: (
      //   <IoGridOutline size={15} color="#000000"/>
      //   ),
      //   type: "link",
      //   path: "/dashboard",
      //   selected:false,
      //   active:false,
      // },
      {
        title: 'Loans',
        icon: <IoCashOutline size={15} color="#000000" />,
        type: 'sub',
        selected: false,
        active: false,
        children: [
          {
            path: '/loans-list',
            type: 'link',
            active: false,
            selected: false,
            title: 'All Loans',
          },
          {
            path: '/payment-history',
            type: 'link',
            active: false,
            selected: false,
            title: 'Payment History',
          },
        ],
      },
      {
        title: 'Loan Products',
        icon: <IoCashOutline size={15} color="#000000" />,
        type: 'sub',
        selected: false,
        active: false,
        children: [
          {
            path: '/view-loan-products',
            type: 'link',
            active: false,
            selected: false,
            title: 'Products',
          },
          {
            path: '/create-loan-product',
            type: 'link',
            active: false,
            selected: false,
            title: 'Create Products',
          },
        ],
      },
      {
        title: 'Approvals',
        icon: <MdOutlineApproval size={15} color="#000000" />,
        path: '/view-approvals',
        type: 'link',
        selected: false,
        active: false,
        // children: [
        //   {
        //     path: '/view-approvals',
        //     type: 'link',
        //     active: false,
        //     selected: false,
        //     title: 'View Approvals',
        //   },
        // ],
      },
      {
        title: 'Disbursements',
        icon: <MdOutlineApproval size={15} color="#000000" />,
        selected: false,
        type: 'sub',
        active: false,
        children: [
          {
            path: '/view-disburments',
            type: 'link',
            active: false,
            selected: false,
            title: 'Disburse',
          },
          {
            path: '/disbursement-history',
            type: 'link',
            active: false,
            selected: false,
            title: 'History',
          },
        ],
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
      {
        title: 'Admin Users',
        icon: <FiUsers size={15} color="#000000" />,
        // type: 'sub',
        path: '/admins',
        type: 'link',
        selected: false,
        active: false,
        // children: [
        //   {
        //     path: '/admins',
        //     type: 'link',
        //     active: false,
        //     selected: false,
        //     title: 'Manager List',
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
