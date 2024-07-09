import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, FormGroup,Form, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Basicwizard } from './formwizarddata';
import { MdOutlineSearch } from 'react-icons/md';
import { useGetLoanApplicationsByStatus } from '@/hooks/api/loanApplications/useGetLoanApplicationsByStatus';
import { useGetManagers } from '@/hooks/api/managers/useGetManagers';
import { useAssignRMToLoan } from '@/hooks/api/loanApplications/useAssignRMToLoan';
import { useAproveLoan } from '@/hooks/api/loanApplications/useAproveLoan';
import { LoanApplicationModel } from '../../hooks/api/loanApplications/IApplication';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  handleShow: (row: any) => void;
}

interface LoanProps {
  loan: any;
  onLoanUpdate?: () => void;
}

const AssignAgent: React.FC<LoanProps> = ({ loan, onLoanUpdate }) => {
  const { getManagers, data: managers } = useGetManagers();
  const { assignRmToLoan, data, error: assginRMError } = useAssignRMToLoan();
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      handleCloseModal();
    }
  }, [data]);
  useEffect(() => {
    getManagers();
  }, []);

  return (
    <div>
      {/* Button Group with Decline Button */}
      <ButtonGroup size="sm" className="flex-nowrap">
        {/* Button with OverlayTrigger for tooltip */}
        <OverlayTrigger placement="top" overlay={<Tooltip>Assign</Tooltip>}>
          <div
            onClick={() => handleButtonClick()}
            className=""
            style={{
              cursor: 'pointer',
              backgroundColor: '#FFB800',
              color: 'white',
              borderRadius: '4px',
              height: '27px',
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
                marginTop: '4px',
                width: '60px',
              }}
            >
              Assign
            </div>
          </div>
        </OverlayTrigger>
        {/* Button with OverlayTrigger for tooltip and Modal Popup */}
      </ButtonGroup>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title> List of Agents </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {managers &&
            managers.relationShipManagers.map((agent) => {
              return (
                <div key={agent._id}>
                  <div
                    style={{
                      display: 'flex',
                      padding: '10px',
                      borderRadius: '10px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid rgba(0,0,0,0.2)',
                      marginTop: '10px'
                    }}
                  >
                    <div>
                      <p>
                        {agent.surname} {agent.firstname}
                      </p>
                      <p>location: Kampala</p>
                    </div>
                    <button
                      onClick={() => {
                        assignRmToLoan(loan.loanApplication?._id, agent._id).then((value) => {
                          if (value && onLoanUpdate) {
                            onLoanUpdate();
                          }
                        });
                      }}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: '#FFB800',
                        color: 'white',
                        padding: '13px',
                        borderRadius: '5px',
                        border: 'unset',
                        height: '38px',
                      }}
                    >
                      <div style={{ marginTop: '-4px' }}> Assign </div>
                    </button>
                  </div>
                </div>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>{assginRMError && <div className="text-center error text-danger">{assginRMError}</div>}</Col>
          </Row>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const ApproveLoan: React.FC<LoanProps> = ({ loan, onLoanUpdate }) => {
  const [approve, setApprove] = useState(false);
  const { aproveLoan } = useAproveLoan();
  const handleApprove = () => {
    setApprove(true);
  };

  const handleCloseApprove = () => {
    setApprove(false);
  };

  const confirmApproval = () => {
    aproveLoan(loan.loanApplication._id, true).then(() => {
      if (onLoanUpdate) {
        onLoanUpdate();
        handleCloseApprove();
      }
    });
  };

  return (
    <>
      {/* Button with OverlayTrigger for tooltip */}
      <OverlayTrigger placement="top" overlay={<Tooltip>Approve</Tooltip>}>
        <div
          onClick={() => handleApprove()}
          style={{
            cursor: 'pointer',
            backgroundColor: '#FFB800',
            color: 'white',
            borderTopLeftRadius: '4px',
            borderBottomLeftRadius: '4px',
            ...(!loan.loanApplication?.approvals.relationship_manager.approval && { opacity: 0.5, pointerEvents: 'none' }),
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

const DeclineLoan: React.FC<LoanProps> = ({ loan, onLoanUpdate }) => {
  const [decline, setDecline] = useState(false);
  const [reason,setReason] = useState(null) as any;
  const { aproveLoan } = useAproveLoan();

  const handleDecline = () => {
    setDecline(true);
  };

  const handleCloseDecline = () => {
    setDecline(false);
  };

  const confirmDecline = (message) => {
    aproveLoan(loan.loanApplication._id, false,message).then((value) => {
      if (value && onLoanUpdate) {
        onLoanUpdate();
        setDecline(false);
      }
    });
  };

  return (
    <>
      {/* Button with OverlayTrigger for tooltip and Modal Popup */}
      <OverlayTrigger placement="top" overlay={<Tooltip>Decline</Tooltip>}>
        <Button
          variant=""
          disabled={loan.loanApplication?.approvals.relationship_manager.approval === null}
          className="btn ripple btn-secondary"
          onClick={() => handleDecline()}
        >
          {' '}
          Decline{' '}
        </Button>
      </OverlayTrigger>

      <Modal show={decline} onHide={handleCloseDecline}>
        <Modal.Body>
          <div>
            <h6> Reason for declining loan</h6>
            <FormGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="form-control"
                  id="reason"
                  placeholder="Reason for declining loan"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  isInvalid={!!reason}
                />
              </FormGroup>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => confirmDecline(reason)}>Yes</Button>
          <Button variant="secondary" onClick={handleCloseDecline}>
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

  const handleSearchClick = () => {
    // Perform search action here, for example, filter the data
    console.log('Search clicked with query:', searchQuery);
  };
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
    getLoanApplications('Pending');
  };

  useEffect(() => {
    if (data) {
      _setTableData(data);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getLoanApplications('Pending');
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
          loading ? <table  className="table table-bordered text-nowrap mb-0">
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
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>Action</th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                Manager
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center',border: '1px solid rgba(0, 0, 0, 0.5)' }}> Status</th>
            </tr>
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
        </table> :   <table style={{ width: '100%'}}>
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
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>Action</th>
              <th style={{ fontWeight: '600', textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                Manager
              </th>
              <th style={{ fontWeight: '600', textAlign: 'center',border: '1px solid rgba(0, 0, 0, 0.5)' }}> Status</th>
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
                    border: '1px solid rgba(0, 0, 0, 0.5)',
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
                  {row?.loanApplication.relationship_manager
                    ? row?.RM?.firstName + ' ' + row?.RM?.surname
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
                  {row.loanApplication?.approvals?.relationship_manager?.approval === true
                    ? 'Approved'
                    : row.loanApplication?.approvals?.relationship_manager?.approval == false
                      ? 'Declined'
                      : '-'}
                </td>

                {/* style={{cursor: "pointer",backgroundColor: "#F33461",color: "white", padding: "5px",borderRadius: "3px"}} */}
                <td style={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                  {!row.loanApplication.relationship_manager && (
                    <AssignAgent onLoanUpdate={handleLoanUpdate} loan={row} />
                  )}
                  {row.loanApplication.relationship_manager && <div>Assigned</div>}
                </td>
                <td style={{ textAlign: 'center', border: '1px solid rgba(0, 0, 0, 0.5)' }}>
                  {/* Button Group with Decline Button */}
                  <ButtonGroup size="sm" className="flex-nowrap">
                    <ApproveLoan onLoanUpdate={handleLoanUpdate} loan={row} />
                    <DeclineLoan onLoanUpdate={handleLoanUpdate} loan={row} />
                  </ButtonGroup>
                </td>
                <td
                  style={{
                    padding: '15px',
                    textAlign: 'center',
                    border: '1px solid rgba(0, 0, 0, 0.5)',
                    color:
                      row.loanApplication.loan_status === 'Declined'
                        ? 'red'
                        : row.loanApplication.loan_status === 'Approved'
                          ? '#5CD3B9'
                          : 'black',
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
