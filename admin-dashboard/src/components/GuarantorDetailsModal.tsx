import { Modal, Button } from 'react-bootstrap';
import Image from './Image';

const GuarantorDetailsModal = ({ show, handleClose, data }: any) => {
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

  const renderField = (label, value) => {
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={label}>
          <strong style={labelStyle}>{label}:</strong>
          <div style={detailStyle}>
            {Object.keys(value).map((key) => (
              <div key={key}>
                <strong style={labelStyle}>{key}:</strong> {value[key] || 'N/A'}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <p key={label}>
        <strong style={labelStyle}>{label}:</strong>
        <div style={detailStyle}>{value || 'N/A'}</div>
      </p>
    );
  };

  const renderImage = (label, value) => (
    <p key={label}>
      <strong style={labelStyle}>{label}:</strong>
      <div style={detailStyle}>
        {value && <Image
              id={value}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
            /> }
      </div>
    </p>
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Guarantor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {data && (
          <>
            {renderField('First Name', data.firstname)}
            {renderField('Surname', data.surname)}
            {renderField('Phone Number', data.phoneNumber)}
            {renderField('Date of Birth', data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString() : 'N/A')}
            {renderField('Gender', data.gender)}
            {renderImage('Profile Image', data.profileImage)}
            {renderImage('ID Image Front', data.idImageFront)}
            {renderImage('ID Image Back', data.idImageBack)}
            {renderField('ID Type', data.idType)}
            {renderField('NIN', data.nin)}
            {renderField('Relationship', data.relationship)}
            {renderField('Address 1', data.address1)}
            {renderField('Address 2', data.address2)}
            {renderField('Address 3', data.address3)}
            {renderField('Business Type', data.businessType)}
            {renderField('Region', data.region)}
            {renderField('Monthly Income', data.monthlyIncome)}
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

export default GuarantorDetailsModal;
