import { Modal, Button } from 'react-bootstrap';
import Image from './Image';

const CustomerDetailsModal = ({ showModal, handleCloseModal, selectedCustomer }: any) => {
  const renderField = (label, value) => {
    if (label === 'businessType' && typeof value === 'object' && value !== null) {
      return (
        <div key={label}>
          <strong>{label}:</strong>
          <div style={{ marginLeft: '20px' }}>
            {Object.entries(value).map(([subKey, subValue]: any) => (
              <p key={subKey}>
                <strong>{subKey}:</strong> <span>{subValue || 'N/A'}</span>
              </p>
            ))}
          </div>
        </div>
      );
    }

    if (
      label === '_id' ||
      label === 'fcmToken' ||
      label === 'authDbId' ||
      label === 'updateProfileFlag' ||
      label === 'dataUpdateVerified' ||
      label === 'temporaryDataStorageBeforeUpdateVerification' ||
      label === '__v' ||
      label === 'role'
    ) {
      return null;
    }

    if (label === 'profileImage' || label === 'idImageFront' || label === 'idImageBack') {
      if (value != null) {
        return (
          <div key={label} style={{ marginBottom: '10px' }}>
            <strong style={{ marginRight: '20px' }}>{label}:</strong>
            <Image
              id={value}
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginTop: '10px' }}
            />
          </div>
        );
      }
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <p key={label}>
          <strong>{label}:</strong> {JSON.stringify(value)}
        </p>
      );
    }

    return (
      <p key={label}>
        <strong>{label}:</strong> {value || 'N/A'}
      </p>
    );
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCustomer ? (
          <div>
            {Object.entries(selectedCustomer).map(([key, value]) => renderField(key, value))}
          </div>
        ) : (
          <p>No customer selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetailsModal;
