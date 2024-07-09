import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { RootState } from '../../redux/app/store';
import { useSelector } from 'react-redux';
import { useLoanProduct } from '../../hooks/useLoanProduct';
import Skeleton from '@mui/material/Skeleton';

const renderLoanProductDetails = (loanProduct: any) => {
  if (!loanProduct) return null;

  const detailStyle = {
    border: '1px solid rgb(4,7,32)',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    marginTop: '5px'
  };

  const labelStyle = {
    marginRight: '10px',
    fontWeight: 'normal'
  };

  return (
    <div className="loan-product-details">
      <p>
        <strong style={labelStyle}>Name:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.name}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Type:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.type}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Interest Rate:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.interest_rate}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Minimum Amount:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.amount[0]}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Maximum Amount:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.amount[1]}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Payment Frequency:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.payment_frequency[0]}</p>
        </div>
      </p>
      <p>
        <strong style={labelStyle}>Payment Period:</strong>
        <div style={detailStyle}>
          <p>{loanProduct.payment_period[0]}</p>
        </div>
      </p>
    </div>
  );
};

const ActionCell = ({ row }: any) => {
  const [id] = useState<string | undefined>(undefined);
  const [reason, setReason] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoanProduct, setSelectedLoanProduct] = useState<any>(null);

  const DATATABLE5 = useSelector((state: RootState) => state.loanProduct.loan_products || []);
  const datapresent = DATATABLE5.length > 0;

  const handleCloseDelete = () => {
    setReason(false);
  };

  const handleShowModal = (loanProduct: any) => {
    setSelectedLoanProduct(loanProduct);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { DeleteLoanProduct } = useLoanProduct();

  return (
    datapresent ? (
      <ButtonGroup size="sm" className="flex-nowrap">
        <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
          <Link
            to={`/edit-loan-product/${row.original._id}`}
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
                marginTop: '5px',
                width: '60px',
              }}
            >
              Edit
            </div>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
          <Button
            variant=""
            className="btn ripple btn-info"
            onClick={() => handleShowModal(row.original)}
          >
            View
          </Button>
        </OverlayTrigger>

        <Modal show={reason} onHide={handleCloseDelete}>
          <Modal.Body>
            <div>
              <h6>Delete Loan Product</h6>
              <div style={{ border: '1px solid rgba(0,0,0,0.2)', padding: '10px', borderRadius: '5px' }}>
                Are you sure you want to delete this loan product?
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                DeleteLoanProduct(id);
                handleCloseDelete();
              }}
            >
              Yes
            </Button>
            <Button variant="secondary" onClick={handleCloseDelete}>
              No
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Loan Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedLoanProduct && renderLoanProductDetails(selectedLoanProduct)}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </ButtonGroup>
    ) : null
  );
};

export const COLUMNS5: any = [
  {
    Header: 'Name',
    accessor: 'name',
    className: 'text-center',
  },
  {
    Header: 'Type',
    accessor: 'type',
    className: 'text-center',
  },
  {
    Header: 'Interest Rate',
    accessor: 'interest_rate',
    className: 'text-center',
  },
  {
    Header: 'Minimum Amount',
    accessor: 'amount[0]',
    className: 'text-center',
  },
  {
    Header: 'Maximum Amount',
    accessor: 'amount[1]',
    className: 'text-center',
  },
  {
    Header: 'Action',
    accessor: 'ACTION',
    className: 'text-center',
    Cell: ActionCell,
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

export const UserList: React.FC = () => {
  const [DATATABLE5,setDataTable5] = useState([]);
  const [loading,setLoading] = useState(true);
  const {GetLoanProducts} = useLoanProduct();

  useEffect(() => {
    const fetchLoanProduct = async() => {
      const data =  await GetLoanProducts();
      setDataTable5(data);
      setLoading(false);
    };
    fetchLoanProduct();
  },[]);
  const tableInstance = useTable(
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
                  </table> :   <table {...getTableProps()} style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                    <thead>
                      {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()} style={{ fontSize: '15px' }}>
                          {headerGroup.headers.map((column: any) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              style={{
                                padding: '15px',
                                fontWeight: '600',
                                textAlign: 'center',
                                border: '1px solid rgba(0, 0, 0, 0.5)',
                              }}
                              key={Math.random()}                            >
                              {column.render('Header')}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()} style={{ padding: '20px' }}>
                      {page.map((row: any) => {
                        prepareRow(row);
                        return (
                          <tr
                            {...row.getRowProps()}
                            key={row.id}
                            style={{ margin: '30px', border: '1px solid rgba(0, 0, 0, 0.5)' }}
                          >
                            {row.cells.map((cell: any) => (
                              <td
                                {...cell.getCellProps()}
                                style={{
                                  padding: '15px',
                                  textAlign: 'center',
                                  border: '1px solid rgba(0, 0, 0, 0.5)',
                                }}
                                key={cell.column.id}
                              >
                                {cell.render('Cell')}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  }
                 
                  {/* <div className="d-flex mt-4 align-items-center">
                    <span className="">
                      Page{' '}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                      </strong>{' '}
                    </span>
                    <span className="ms-auto ps-2">
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-2"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      >
                        {' First '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-2"
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      >
                        {' << '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-2"
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      >
                        {' >> '}
                      </Button>
                      <Button
                        variant=""
                        className="btn-default tablebutton me-2 my-2"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      >
                        {' Last '}
                      </Button>
                    </span>
                  </div> */}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

