import React, { useState, useEffect } from 'react';
import { Card, Col, InputGroup, Row,OverlayTrigger,Tooltip} from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useGuarantors } from '@/hooks/useGuarantor';
import GuarantorDetailsModal from '@/components/GuarantorDetailsModal';
import Skeleton from '@mui/material/Skeleton';

const GlobalFilter2 = ({ filter, setFilter }:any) => (
  <input
    value={filter || ''}
    onChange={(e) => setFilter(e.target.value)}
    className="form-control"
    placeholder="Search..."
  />
);

const createColumns = (handleShow) => [
  {
    Header: 'Firstname',
    accessor: 'firstname',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Surname',
    accessor: 'surname',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Phonenumber',
    accessor: 'phoneNumber',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
    className: 'wd-20p borderrigth',
  },
  {
    Header: 'Action',
    accessor: 'action',
    className: 'wd-10p borderrigth',
    Cell: ({ row }: any) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>View</Tooltip>}>
        <div
          style={{
            cursor: 'pointer',
            backgroundColor: '#FFB800',
            color: 'white',
            borderRadius: '4px',
            padding: '5px'
          }}
          onClick={() => handleShow(row)}
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
            }}
          >
            View
          </div>
        </div>
      </OverlayTrigger>
    ),
  },
];

export const UserList = () => {
  const { GetAllGuarantors, data } = useGuarantors();
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllGuarantors();
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleShow = (row) => {
    setSelectedData(row.original);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const columns = React.useMemo(() => createColumns(handleShow), []);

  const tableInstance = useTable(
    {
      columns,
      data: data || [],
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
  }:any = tableInstance;

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
                          {Array.from({ length: 5 }).map((_, colIndex) => (
                            <td key={colIndex}  style={{ border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                              <Skeleton animation="wave" height={30} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table> :   <table {...getTableProps()} className="table table-bordered text-nowrap mb-0">
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
                    <tbody {...getTableBodyProps()}>
                      {page.map((row) => {
                        prepareRow(row);
                        return (
                          <tr className="text-center" {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                              <td
                                {...cell.getCellProps()}
                                key={cell.column.id}
                                style={{
                                  background: cell.status === 'Overdue' ? 'red' : '',
                                  border: '1px solid rgba(0, 0, 0, 0.5)',
                                }}
                              >
                                {typeof cell.value === 'object' ? JSON.stringify(cell.value) : cell.render('Cell')}
                              </td>
                            ))}
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
      {selectedData && (
        <GuarantorDetailsModal show={showModal} handleClose={handleClose} data={selectedData} />
      )}
    </>
  );
};
