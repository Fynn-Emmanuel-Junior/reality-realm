import { Modal, Button } from 'react-bootstrap';

const DetailsModal = ({ show, handleClose, data }: any) => {
    const detailStyle = {
        border: "1px solid rgb(4,7,32)",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "10px",
      };
    
      const labelStyle = {
        marginRight: "10px",
        fontWeight: "normal",
        marginBottom: '10px'
      };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Disbursement Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && (
          <>
            <p><strong style={labelStyle}>Account Number:</strong> 
                <div style={detailStyle}>
                    {data.account_number}
                </div>
            </p>
            <p><strong style={labelStyle}>Amount:</strong> 
                <div style={detailStyle}>
                    {data.amount}
                </div>
            </p>
            <p><strong style={labelStyle}>Bank Code:</strong> 
                <div style={detailStyle}>
                    {data.bank_code}
                </div>
            </p>
            <p><strong style={labelStyle}>Bank Name:</strong> 
               <div style={detailStyle}>
                    {data.bank_name}
               </div>
            </p>
            <p><strong style={labelStyle}>Complete Message:</strong> 
                <div style={detailStyle}>
                    {data.complete_message}
                </div>
            </p>
            <p><strong style={labelStyle}>Currency:</strong> 
                <div style={detailStyle}>
                    {data.currency}
                </div>
            </p>
            <p><strong style={labelStyle}>Fee:</strong> 
                <div style={detailStyle}>
                    {data.fee}
                </div>
            </p>
            <p><strong style={labelStyle}>Full Name:</strong> 
                <div style={detailStyle}>
                    {data.fullname}
                </div>
            </p>
            <p><strong style={labelStyle}>ID:</strong> 
                <div style={detailStyle}>
                    {data.id}
                </div>
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
