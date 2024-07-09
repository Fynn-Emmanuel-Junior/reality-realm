import { Fragment, useState } from 'react';
import { Modal, Button} from 'react-bootstrap';
import { UserList } from './disburmentHistoryTable';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <Fragment>
      <Pageheader title="Disbursement History" />

      <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header">
              <h6 className="modal-title"> Payment details </h6>
              <Button variant="" className="btn-close" type="button" onClick={handleClose}>
                <span aria-hidden="true">×</span>
              </Button>
            </Modal.Header>

            <Modal.Body className="modal-body">
              {' '}
              <div className="p-4">
                <div>
                  <section className="card-body Basicwizard ">
                    <div className="control-group form-group mb-0">
                      <h6>Pending Balance</h6>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid rgba(0, 0, 0, 0.2)',
                          borderRadius: '10px',
                          height: '45px',
                          paddingLeft: '10px',
                          paddingRight: '10px',
                        }}
                      >
                        <div>
                          <div>
                            <p> {'UGX 350,000'} </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <div className="control-group form-group mb-0">
                        <h6> User </h6>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            height: '45px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                          }}
                        >
                          <div>
                            <div>
                              <p> {' David'} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <div className="control-group form-group mb-0">
                        <h6> Amount </h6>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            height: '45px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                          }}
                        >
                          <div>
                            <div>
                              <p> {'UGX 350,000'} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <div className="control-group form-group mb-0">
                        <h6> Payment period </h6>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            height: '45px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                          }}
                        >
                          <div>
                            <div>
                              <p> {'Monthly'} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: '15px' }}>
                      <div className="control-group form-group mb-0">
                        <h6> Payment frequency </h6>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid rgba(0, 0, 0, 0.2)',
                            borderRadius: '10px',
                            height: '45px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                          }}
                        >
                          <div>
                            <div>
                              <p> {'Daily'} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
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
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;