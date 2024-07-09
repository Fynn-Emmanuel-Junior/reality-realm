import { Button, Modal } from 'react-bootstrap';
import { Basicwizard } from '../pages/loansList/formwizarddata';

// eslint-disable-next-line react/prop-types
const LoanApplicationModal = ({selectedLoan, show, handleClose}) => {
return (
    <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modal-header">
                    <h6 className="modal-title">Loan Details</h6>
                    <Button variant="" className="btn-close" type="button" onClick={handleClose}>
                        <span aria-hidden="true">×</span></Button>
                </Modal.Header>

                <Modal.Body className="modal-body"> <div className="p-4">
                    <Basicwizard selectedItem={selectedLoan}  />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="" className="btn ripple btn-secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </div>
);
};

export default LoanApplicationModal;
