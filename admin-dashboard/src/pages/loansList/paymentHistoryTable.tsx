import React, { useState, useEffect } from 'react';
import { Button, Card, Col, InputGroup, Row, Modal } from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useLoanPayments } from '@/hooks/useLoanPayments';
import Skeleton from '@mui/material/Skeleton';

export const COLUMNS5: any = [
  {
    Header: 'Payment ID',
    accessor: 'payment_response.data.id',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Payment Method',
    accessor: 'network',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'User',
    accessor: 'payment_response.data.customer.name',
    className: 'wd-20p borderrigth',
  },
];

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

const DetailsModal = ({ show, handleClose, data }: any) => {
  if (!data) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Payment ID:</strong> {data.payment_id}</p>
        <p><strong>Payment Method:</strong> {data.bank_name}</p>
        <p><strong>Amount:</strong> {data.amount}</p>
        <p><strong>User:</strong> {data.user}</p>
        {/* Add more fields as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

interface Props {
  handleShow: () => void;
}

export const UserList: React.FC<Props> = () => {
  const { GetAllLoanPayments, data } = useLoanPayments();
  const [DATATABLE5, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllLoanPayments();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setData(data);
      setLoading(false);
    }
  }, [data]);

  const tableInstance: any = useTable(
    {
      columns: COLUMNS5,
      data: DATATABLE5,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    setGlobalFilter,
    page,
  } = tableInstance;

  const { globalFilter } = state;

  const handleRowClick = (row: any) => {
    setSelectedData(row.original);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
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
                  {
                    loading ? <table  className="table table-bordered text-nowrap mb-0">
                    <thead>
                      {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                          {headerGroup.headers.map((column) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              className={column.className}
                              key={column.id}
                              style={{ border: '1px solid rgba(0, 0, 0, 0.5)' }}
                            >
                              <span className="tabletitle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {column.render('Header')}
                              </span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {Array.from({ length: 3 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                          {Array.from({ length: 6 }).map((_, colIndex) => (
                            <td key={colIndex}  style={{ border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                              <Skeleton animation="wave" height={30} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table> : <table {...getTableProps()} className="table table-bordered text-nowrap mb-0">
                    <thead>
                      {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                          {headerGroup.headers.map((column: any) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              className={column.className}
                              key={Math.random()}
                              style={{border: '1px solid rgba(0, 0, 0, 0.5)'}}
                            >
                              <span className="tabletitle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{column.render('Header')}</span>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row: any) => {
                        prepareRow(row);
                        return (
                          <tr
                            className="text-center"
                            {...row.getRowProps()}
                            key={Math.random()}
                            onClick={() => handleRowClick(row)}
                            style={{ cursor: 'pointer' }}
                          >
                            {row.cells.map((cell: any) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  key={Math.random()}
                                  style={{
                                    background: cell.status === 'Overdue' ? 'red' : '',
                                    border: '1px solid rgba(0, 0, 0, 0.5)' // Conditional background color
                                  }}
                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  }
                 
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <DetailsModal show={showModal} handleClose={handleClose} data={selectedData} />
    </>
  );
};
