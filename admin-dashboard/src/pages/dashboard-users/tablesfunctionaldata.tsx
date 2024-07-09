import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { RootState } from '../../redux/app/store';
import { useSelector } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import Skeleton from '@mui/material/Skeleton';

export const COLUMNS5: any = [
  {
    Header: 'Name',
    accessor: 'firstname',
    className: 'text-center',
  },
  {
    Header: 'Role',
    accessor: 'role',
    className: 'text-center',
  },
  {
    Header: 'Phone Number',
    accessor: 'phoneNumber',
    className: 'text-center',
  },
  {
    Header: 'Action',
    accessor: 'action',
    className: 'text-center',
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

export const UserList = () => {
  const [reason, setReason] = useState(false);
  const DATATABLE5 = useSelector((state: RootState) => state.managers.managers) || [];
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if(DATATABLE5) {
      setLoading(false);
    }
  },[]);

  // const handleDelete = () => {
  //   setReason(true);
  // };

  const handleCloseDelete = () => {
    setReason(false);
  };

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
                          {Array.from({ length: 4 }).map((_, colIndex) => (
                            <td key={colIndex}  style={{ border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                              <Skeleton animation="wave" height={30} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table> : 
                  <table {...getTableProps()} style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                  <thead>
                    {headerGroups.map((headerGroup: any) => (
                      <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()} style={{ fontSize: '15px' }}>
                        {headerGroup.headers.map((column:any) => (
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
                    {page.length > 0 ? (page.map((row: any) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} key={Math.random()} style={{ margin: '30px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                          {row.cells.map((cell: any) => (
                            <td
                              {...cell.getCellProps()}
                              style={{
                                padding: '15px',
                                textAlign: 'center',
                                border: '1px solid rgba(0, 0, 0, 0.5)',
                              }}
                              key={Math.random()}
                            >
                              {cell.column.id === 'action' ? (
                                <ButtonGroup size="sm" className="flex-nowrap">
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                                    <Link
                                      to={`/edit-admin-profile/${row.original._id}`}
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
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Disable</Tooltip>}>
                                    <Button variant="" className="btn ripple btn-secondary" disabled>
                                      Disable
                                    </Button>
                                  </OverlayTrigger>
                                </ButtonGroup>
                              ) : (
                                cell.render('Cell')
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })) : (
                      <tr>
                            <td colSpan={COLUMNS5.length} style={{ textAlign: 'center', padding: '15px' }}>
                              No data available
                            </td>
                          </tr>
                    )}
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

            <Modal show={reason} onHide={handleCloseDelete}>
              <Modal.Body>
                <div>
                  <h6> Delete admin account </h6>
                  <div style={{ border: '1px solid rgba(0,0,0,0.2', padding: '10px', borderRadius: '5px' }}>
                    Are you sure you want to delete admin account
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button>Yes</Button>
                <Button variant="secondary" onClick={handleCloseDelete}>
                  No
                </Button>
              </Modal.Footer>
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
};
