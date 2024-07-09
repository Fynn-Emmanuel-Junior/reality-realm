import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button, ButtonGroup, InputGroup, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/app/store';
import { useCustomer } from '@/hooks/useCustomer';
import { getFileLink } from '@/utils/api';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalFilter2 = ({ filter, setFilter }: any) => {
  return (
    <input
      value={filter || ''}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control"
      placeholder="Search..."
    />
  );
};

const AdminApproval = ({ row, onApprove, onDecline }: any) => {
  const { dataUpdateVerified, temporaryDataStorageBeforeUpdateVerification } = row.original;
  const [showModal, setShowModal] = useState(false);
  const [showDeclineModal,setShowDeclineModal] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const { AdminApproveUserUpdate, UpdateCustomer } = useCustomer();

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleDeclineButtonClick = () => {
    setShowDeclineModal(true);
  };

  const handleDeclineClose = () => {
    setShowDeclineModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleApproval = async (approve) => {
    await AdminApproveUserUpdate({
      dataUpdateVerified: true,
      UserId: row.original._id,
    });
    console.log(`Approval status: ${approve ? 'Approved' : 'Rejected'}`);
    toast.success('Customer bio data approved successfully');
    setShowModal(false);
    onApprove(row.original._id);
  };

  const handleDelete = async () => {
    await UpdateCustomer({
      updateProfileFlag: 0,
      userID: row.original._id,
      temporaryDataStorageBeforeUpdateVerification: null,
    });
    setShowModal(false);
    toast.error('Customer bio data declined');
    setButtonsVisible(false);
    onDecline(row.original._id);
  };

  const renderNestedObject = (obj, parentKey = '') => {
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      if (!value) return null;
      if (parentKey.includes('geolocation') && key === 'Verify') return null;

      const combinedKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === 'object' && value !== null) {
        return (
          <div key={combinedKey}>
            <strong>{key}: </strong>
            <div>{renderNestedObject(value, combinedKey)}</div>
          </div>
        );
      }

      if (key.includes('Image') && value) {
        return (
          <div key={combinedKey} style={{ margin: '5px' }}>
            <strong style={{ marginBottom: '5px' }}>{key}: </strong>
            <img src={getFileLink(value)} alt={key} style={{ width: '200px', height: 'auto' }} />
          </div>
        );
      }

      return (
        <div key={combinedKey} style={{ margin: '5px' }}> 
          <strong style={{ marginBottom: '10px' }}>{key}: </strong>
          <div style={{ border: '1px solid black', padding: '5px', borderRadius: '5px' }}>{value}</div>
        </div>
      );
    });
  };

  if (temporaryDataStorageBeforeUpdateVerification == null) return null;
  if (dataUpdateVerified === true) return null;

  return buttonsVisible ? (
    <>
      <ButtonGroup size="sm" className="flex-nowrap">
        <OverlayTrigger placement="top" overlay={<Tooltip>Approve</Tooltip>}>
          <div
            onClick={handleButtonClick}
            style={{
              cursor: 'pointer',
              backgroundColor: '#FFB800',
              color: 'white',
              borderTopLeftRadius: '4px',
              borderBottomLeftRadius: '4px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '12px',
                marginTop: '2px',
                width: '70px',
                padding: '5px',
              }}
            >
              Approve
            </div>
          </div>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>Decline</Tooltip>}>
          <Button
            variant=""
            className="btn ripple btn-secondary"
            style={{ width: '70px' }}
            onClick={handleDeclineButtonClick}
          >
            Decline
          </Button>
        </OverlayTrigger>
      </ButtonGroup>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Temporary Data Storage Before Update Verification:</h6>
          <ul>
            {temporaryDataStorageBeforeUpdateVerification && renderNestedObject(temporaryDataStorageBeforeUpdateVerification)}
          </ul>
          <div>Do you want to approve this customer bio data?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleApproval(true)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeclineModal} onHide={handleDeclineClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Approval</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure you want to decline this customer bio data?</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleDeclineClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
};

const ActionCell = ({ row }: any) => {
  const dataPresent = useSelector((state: RootState) => state.customers.customers);

  return dataPresent ? (
    <ButtonGroup size="sm" className="flex-nowrap">
      <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
        <Link
          to={`/edit-customer/${row.original._id}`}
          style={{
            cursor: 'pointer',
            backgroundColor: '#FFB800',
            color: 'white',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: '12px',
              marginTop: '2px',
              width: '70px',
              padding: '5px',
            }}
          >
            Edit
          </div>
        </Link>
      </OverlayTrigger>
      <Button
        variant=""
        className="btn ripple btn-info"
        style={{ width: '70px'}}
      >
        <Link 
          to={`/customer-profile/${row.original._id}`}
          style={{color: 'white'}}
        >
          View
        </Link>
      </Button>
    </ButtonGroup>
  ) : null;
};

export const UserList = () => {
  const [DATATABLE5, setDataTable5] = useState([]);
  const { GetCustomers } = useCustomer();
  const [adminApprovalRows, setAdminApprovalRows] = useState([]);
  
  const dataPresent = DATATABLE5.length > 0;

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await GetCustomers();
      if (data) {
        setDataTable5(data);
        setAdminApprovalRows(data.filter((customer) => customer.temporaryDataStorageBeforeUpdateVerification !== null));
      }
    };
    fetchCustomers();
  }, []);

  const hasAdminApproval = adminApprovalRows.length > 0;

  const handleApprove = (userId) => {
    setAdminApprovalRows((prev) => prev.filter((customer: any) => customer._id !== userId));
  };

  const handleDecline = (userId) => {
    setAdminApprovalRows((prev: any) =>
      prev
        .map((customer: any) =>
          customer._id === userId
            ? { ...customer, temporaryDataStorageBeforeUpdateVerification: null }
            : customer
        )
        .filter((customer: any) => customer.temporaryDataStorageBeforeUpdateVerification !== null)
    );
  };

  const COLUMNS5 = useMemo(() => {
    const columns = [
      {
        Header: 'Firstname',
        accessor: 'firstname',
        className: 'text-center',
      },
      {
        Header: 'Surname',
        accessor: 'surname',
        className: 'text-center',
      },
      {
        Header: 'Phone number',
        accessor: 'phoneNumber',
        className: 'text-center',
      },
      {
        Header: 'Action',
        accessor: 'ACTION',
        className: 'text-center',
        Cell: ({ row }: any) => <ActionCell row={row} />,
      },
    ];

    if (hasAdminApproval) {
      columns.push({
        Header: 'Admin Approval',
        accessor: 'ADMIN_ACCESSOR',
        className: 'text-center',
        Cell: ({ row }: any) => <AdminApproval row={row} onApprove={handleApprove} onDecline={handleDecline} />,
      });
    }

    return columns;
  }, [hasAdminApproval]);

  const tableInstance = useTable(
    {
      columns: COLUMNS5,
      data: dataPresent ? DATATABLE5 : [],
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
  }: any = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <ToastContainer />
      <Row>
        <Col lg={12} xl={12}>
          <InputGroup className="mb-2">
            <GlobalFilter2 filter={globalFilter} setFilter={setGlobalFilter} />
            <InputGroup.Text className="btn btn-primary">
              <i className="fa fa-search" aria-hidden="true"></i>
            </InputGroup.Text>
          </InputGroup>
          <Card>
            <Card.Body>
              <div className="e-table pb-5">
                <div className="table-responsive">
                    <table {...getTableProps()} style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                      <thead>
                        {headerGroups.map((headerGroup) => (
                          <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()} style={{ fontSize: '15px' }}>
                            {headerGroup.headers.map((column) => (
                              <th
                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                style={{
                                  padding: '15px',
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  border: '1px solid rgba(0, 0, 0, 0.5)',
                                }}
                                key={Math.random()}
                              >
                                {column.render('Header')}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()} style={{ padding: '20px' }}>
                        {page.length > 0 ? (
                          page.map((row) => {
                            prepareRow(row);
                            return (
                              <tr
                                {...row.getRowProps()}
                                key={Math.random()}
                                style={{ margin: '30px', border: '1px solid rgba(0, 0, 0, 0.5)' }}
                              >
                                {row.cells.map((cell) => (
                                  <td
                                    {...cell.getCellProps()}
                                    style={{
                                      padding: '15px',
                                      textAlign: 'center',
                                      border: '1px solid rgba(0, 0, 0, 0.5)',
                                    }}
                                    key={cell.id}
                                  >
                                    {cell.render('Cell')}
                                  </td>
                                ))}
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={COLUMNS5.length} style={{ textAlign: 'center', padding: '15px' }}>
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
