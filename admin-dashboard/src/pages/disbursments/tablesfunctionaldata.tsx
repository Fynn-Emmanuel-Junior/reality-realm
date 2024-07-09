import React, { useEffect, useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Basicwizard } from './formwizarddata';
import { MdOutlineSearch } from 'react-icons/md';
import { useGetLoanApplicationsByStatus } from '@/hooks/api/loanApplications/useGetLoanApplicationsByStatus';
import { useDisbursement } from '@/hooks/api/payments/useDisbursement';
import { useGetUserDetails } from '@/hooks/api/clients/useGetUserDetails';
import { LoanApplicationModel } from '../../hooks/api/loanApplications/IApplication';
import { ExistingUser } from '../../hooks/api/clients/IUser';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  handleShow: (row: any) => void;
}

interface LoanProps {
  loan: LoanApplicationModel;
  onLoanUpdate?: () => void;
}

const ApproveLoan: React.FC<LoanProps> = ({ loan, onLoanUpdate }) => {
  const [approve, setApprove] = useState(false);
  const { disburseLoan } = useDisbursement();
  const { getUserDetails } = useGetUserDetails();
  const handleApprove = () => {
    setApprove(true);
  };

  const handleCloseApprove = () => {
    setApprove(false);
  };

  const confirmApproval = () => {
    getUserDetails(loan.loanApplication.user_id).then((user: ExistingUser) => {
      if (user) {
        disburseLoan(
          loan.loanApplication._id,
          loan.loanApplication.terms.amount,
          user.phoneNumber,
          loan.client.surname + ' ' + loan.client.firstName
        ).then((user) => {
          if (user && onLoanUpdate) {
            onLoanUpdate();
            setApprove(false);
          }
        });
      }
    });
  };

  return (
    <>
      {/* Button with OverlayTrigger for tooltip */}
      <OverlayTrigger placement="top" overlay={<Tooltip>Approve</Tooltip>}>
        <div
          onClick={() => handleApprove()}
        >
          <div
            style={{
              cursor: 'pointer',
              backgroundColor: '#FFB800',
              color: 'white',
              borderRadius: '4px',
              width: '90px',
              margin: 'auto',
              padding: '5px',
              textAlign: 'center',
              fontSize: '12px'
            }}
          >
            Approve
          </div>
        </div>
      </OverlayTrigger>

      <Modal show={approve} onHide={handleCloseApprove}>
        <Modal.Body>
          <div>
            <h6> Loan Approval </h6>
            <div style={{ border: '1px solid rgba(0,0,0,0.2', padding: '10px', borderRadius: '5px' }}>
              Are you sure you want to approve loan
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirmApproval}>Yes</Button>
          <Button variant="secondary" onClick={handleCloseApprove}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const BasicTable: React.FC<Props> = ({ handleShow }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [loading,setLoading] = useState(true);

  const handleSearchInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {};
  const [reason, setReason] = useState(false);

  const handleReason = () => {
    setReason(true);
  };

  const handleCloseReason = () => {
    setReason(false);
  };

  const [loan] = useState(false);

  const handleloanDetails = () => {
    // setLoan(true);
  };

  const handleClosedetails = () => {
    // setLoan(false);
  };
  const [tableData, _setTableData] = useState<LoanApplicationModel[]>([]);
  const { getLoanApplications, data } = useGetLoanApplicationsByStatus();

  const handleLoanUpdate = () => {
    getLoanApplications('Approved');
  };

  useEffect(() => {
    if (data) {
      _setTableData(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getLoanApplications('Approved');
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{
            margin: '10px',
            width: '100%',
            padding: '10px',
            border: isFocused ? '0.5px solid #5CD3B9' : '0.5px solid rgba(0,0,0,0.2)',
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div
          onClick={handleSearchClick}
          style={{
            cursor: 'pointer',
            background: '#5CD3B9',
            padding: '6px',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
          }}
        >
          <MdOutlineSearch size={30} color="#ffffff" />
        </div>
      </div>

      <div>
        {/* Display table */}
        {
          loading ?  <table  className="table table-bordered text-nowrap mb-0">
           <thead>
            <tr style={{ fontSize: '15px' }}>
              <th
                style={{
                  padding: '15px',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '15px',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                }}
              >
                {' '}
                Amount{' '}
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                RM Assigned
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                RM Status
              </th>
            
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                Disburse
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center' }}> Status</th>
            </tr>
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
        </table> :  <table style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
          <thead>
            <tr style={{ fontSize: '15px' }}>
              <th
                style={{
                  padding: '15px',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: '15px',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.5)',
                }}
              >
                {' '}
                Amount{' '}
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                RM Assigned
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                RM Status
              </th>
            
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                Disburse
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center' }}> Status</th>
            </tr>
          </thead>
          <tbody style={{ padding: '20px' }}>
            {/* Table rows */}
            {/* Assuming DATATABLE is defined here */}
            {tableData.map((row: any, index) => (
              <tr key={index} style={{ margin: '30px', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                <td
                  style={{
                    padding: '15px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                  onClick={() => {
                    handleShow(row);
                  }}
                >
                  {row.client?.firstName + ' ' + row.client?.surname}
                </td>
                <td style={{ padding: '15px', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                  {row?.loanApplication.terms?.amount}
                </td>

                <td
                  onClick={() => {
                    if (row.Agent === 'Declined') {
                      handleReason();
                    }
                  }}
                  style={{
                    textAlign: 'center',
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                    color: row.Agent === 'Declined' ? '#F33461' : 'black',
                    cursor: row.Agent === 'Declined' ? 'pointer' : 'default',
                  }}
                >
                  {row.RM
                    ? row.RM.firstName + ' ' + row.RM.surname
                    : 'No agent assigned'}
                </td>

                <td
                  onClick={() => {
                    if (row.Status === 'Declined') {
                      handleReason();
                    }
                  }}
                  style={{
                    textAlign: 'center',
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                    color: row.Status === 'Declined' ? '#F33461' : 'black',
                    cursor: row.Status === 'Declined' ? 'pointer' : 'default',
                  }}
                >
                  {(row.loanApplication?.approvals?.relationship_manager?.approval === true ? 'Approved' : 'Declined') || '-'}
                </td>

                {/* style={{cursor: "pointer",backgroundColor: "#F33461",color: "white", padding: "5px",borderRadius: "3px"}} */}
               
                <td style={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>

                  <ApproveLoan onLoanUpdate={handleLoanUpdate} loan={row} />
                  {/* <DeclineLoan onLoanUpdate={handleLoanUpdate} loan={row} /> */}
                </td>
                <td
                  style={{
                    padding: '15px',
                    textAlign: 'center',
                    color:
                      row.loanApplication.loan_status === 'Declined' ? 'red' : row.loanApplication.loan_status === 'Approved' ? '#5CD3B9' : 'black',
                  }}
                >
                  {row.loanApplication.loan_status || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
        
        <Modal show={reason} onHide={handleCloseReason}>
          <Modal.Header closeButton>
            <Modal.Title> Loan declined by Agent </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6> Reason </h6>
              <div style={{ border: '1px solid rgba(0,0,0,0.2', padding: '10px', borderRadius: '5px' }}>
                Submitted Inaccurate bank statements
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseReason}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={loan} onHide={handleloanDetails}>
          <Modal.Header className="modal-header">
            <h6 className="modal-title">Loan List</h6>
            <Button variant="" className="btn-close" type="button" onClick={handleClosedetails}>
              <span aria-hidden="true">×</span>
            </Button>
          </Modal.Header>

          <Modal.Body className="modal-body">
            {' '}
            <div className="p-4">
              <Basicwizard />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="btn ripple btn-secondary" onClick={handleClosedetails}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};