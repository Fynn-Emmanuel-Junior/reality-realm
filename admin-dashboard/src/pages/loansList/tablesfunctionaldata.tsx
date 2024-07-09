import { useEffect, useState } from 'react';
import {
  Card,
  Col,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useGetAllLoanApplications } from '@/hooks/api/loanApplications/useGetAllLoansApplications';
import { LoanApplicationModel } from '../../hooks/api/loanApplications/IApplication';
import Skeleton from '@mui/material/Skeleton';

//
export const COLUMNS5: any = [
  {
    Header: 'Name',
    accessor: (row: LoanApplicationModel) => `${row.client?.firstName} ${row.client?.surname}`,
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Amount',
    accessor: 'loanApplication.terms.amount',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Interest rate',
    accessor: 'loanApplication.terms.interest_rate',
    className: 'wd-15p borderrigth',
  },
  {
    Header: 'Payment period',
    accessor: 'loanApplication.terms.payment_period',
    className: 'wd-20p borderrigth',
  },
  {
    Header: 'Pending balance',
    accessor: 'loanApplication.balance',
    className: 'wd-20p borderrigth',
  },
  {
    Header: 'Status',
    accessor: 'loanApplication.loan_status',
    className: 'text-center ',
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

interface loansProps {
  handleShow: (row: object) => void;
}
// eslint-disable-next-line react/prop-types
export const LoanApplicationsList: React.FC<loansProps> = ({ handleShow }) => {
  const { getAllLoanApplications, data } = useGetAllLoanApplications();
  const [tableData, _setTableData] = useState<LoanApplicationModel[]>(() => []);
  const [loading,setLoading] = useState(true);

  const tableInstance: any = useTable(
    {
      columns: COLUMNS5,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps, // table props from react-table
    headerGroups, // headerGroups, if your table has groupings
    getTableBodyProps, // table body props from react-table
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    setGlobalFilter,
    page, // use, page or rows
  } = tableInstance;

  const { globalFilter } = state;

  useEffect(() => {
    if (data) {
      _setTableData(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
   const fetch = async() => {
     await getAllLoanApplications();
   };
   fetch();
  }, []);

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
                <div className="table-responsive ">
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
                  </table> :  <table {...getTableProps()} className="table table-bordered text-nowrap mb-0">
                    <thead>
                      {headerGroups.map((headerGroup: any) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={Math.random()}>
                          {headerGroup.headers.map((column: any) => (
                            <th
                              {...column.getHeaderProps(column.getSortByToggleProps())}
                              className={column.className}
                              key={Math.random()}
                              style={{ border: '1px solid rgba(0, 0, 0, 0.5)'}}
                            >
                              <span className="tabletitle">{column.render('Header')}</span>
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
                            onClick={() => {
                              handleShow(row);
                            }}
                            style={{ cursor: 'pointer'}}
                            className="text-center"
                            {...row.getRowProps()}
                            key={Math.random()}
                          >
                            {row.cells.map((cell: any) => {
                              return (
                                <td
                                  {...cell.getCellProps()}
                                  key={Math.random()}
                                  style={{
                                    background: cell.status == 'Overdue' ? 'red' : '',
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
    </>
  );
};

export default LoanApplicationsList;
