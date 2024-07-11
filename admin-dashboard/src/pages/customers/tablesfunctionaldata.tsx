import { useState, useMemo} from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Button, ButtonGroup, InputGroup, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/app/store';

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
  
  const dataPresent = DATATABLE5.length > 0;

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

    return columns;
  });

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
                          page.map((row: any) => {
                            prepareRow(row);
                            return (
                              <tr
                                {...row.getRowProps()}
                                key={Math.random()}
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
