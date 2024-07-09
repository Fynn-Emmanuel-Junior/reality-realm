import { Fragment, useState } from 'react';
import { Card, Col, Row, FormGroup, Form, Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pageheader from '../../../layout/layoutcomponent/pageheader';

const Profile = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Fragment>
      <Pageheader title="Edit Product" />
      <Row>
        <Col lg={12} md={12}>
          <span className=" py-0 ">
            <div className="profile-tab tab-menu-heading border-bottom-0 ">
              <div className="main-content-body tab-pane  border-0" id="settings">
                <Card>
                  <Card.Body className=" border-0" data-select2-id="12">
                    <Form className="form-horizontal" data-select2-id="11">
                      <div className="mb-4 main-content-label">Product</div>
                      <FormGroup className="form-group ">
                        <Row className=" row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Name</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Product Name"
                              defaultValue=""
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group ">
                        <Row className=" row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Amount</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control type="text" className="form-control" placeholder="Amount" defaultValue="" />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group ">
                        <Row className=" row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Description</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="number"
                              className="form-control"
                              placeholder="product description"
                              defaultValue=""
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      {/* <div className="mb-4 main-content-label">
                                  Distributor products
                                </div> */}

                      <Row className=" row-sm">
                        <Col md={3}>
                          <Form.Label className="form-label">Quantity</Form.Label>
                        </Col>
                        <Col md={9}>
                          <Form.Control type="number" className="form-control" placeholder="Quantity" defaultValue="" />
                        </Col>
                      </Row>
                      <FormGroup className="form-group float-end">
                        <Row className=" row-sm">
                          <Col md={12}>
                            {' '}
                            <Link
                              className="mg-r-10 btn  my-1"
                              to="#"
                              style={{ backgroundColor: '#FFB800', color: 'white' }}
                            >
                              Save details
                            </Link>{' '}
                            <Link className="btn btn-secondary" to="#" onClick={() => handleShow()}>
                              Delete product
                            </Link>{' '}
                          </Col>
                        </Row>
                      </FormGroup>
                    </Form>
                  </Card.Body>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                      <div>
                        <h6> Delete customer account </h6>
                        <div style={{ border: '1px solid rgba(0,0,0,0.2', padding: '10px', borderRadius: '5px' }}>
                          Are you sure you want to delete customer account
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button>Yes</Button>
                      <Button variant="secondary" onClick={handleClose}>
                        No
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card>
              </div>
            </div>
          </span>
        </Col>
      </Row>
      {/* <Row className=" row-sm">
      <Col lg={12} md={12}>
        <div className="tab-content"></div>

      </Col>
    </Row> */}
    </Fragment>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
