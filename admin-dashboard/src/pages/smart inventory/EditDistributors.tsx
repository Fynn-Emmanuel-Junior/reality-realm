import { Fragment } from "react";
import { Card,Col,Row,FormGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import ImageUploader from "./ImageUploader";

const Profile = () =>{
  return(
  <Fragment>

    <Pageheader title="Edit Distributor" />
    <Row>
      <Col lg={12} md={12}>
        <span className=" py-0 ">
          <div className="profile-tab tab-menu-heading border-bottom-0 ">
          <div
                          className="main-content-body tab-pane  border-0"
                          id="settings"
                        >
                          <Card>
                            <Card.Body
                              className=" border-0"
                              data-select2-id="12"
                            >
                              <Form
                                className="form-horizontal"
                                data-select2-id="11"
                              >
                                <div className="mb-4 main-content-label">
                                  Distributor
                                </div>
                                <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Name
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="Distributor Name"
                                        defaultValue=""
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Location
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="location"
                                        defaultValue=""
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
								<FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Products
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="number"
                                        className="form-control"
                                        placeholder="Number of products"
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
                                      <Form.Label className="form-label">
                                        Description
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="number"
                                        className="form-control"
                                        placeholder="Product Description"
                                        defaultValue=""
                                      />
                                    </Col>
                                  </Row>
                             
                                {/* <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Login Verification
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      {" "}
                                      <Link className="" to="#">
                                        Settup Verification
                                      </Link>
                                    </Col>
                                  </Row>
                                </FormGroup> */}
                                {/* <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Password Verification
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Label className="ckbox  mg-b-10">
                                        <input type="checkbox" />
                                        <span>Require Personal Details</span>
                                      </Form.Label>
                                    </Col>
                                  </Row>
                                </FormGroup> */}
                                {/* <div>
                                  <div className="mb-4 main-content-label">
                                    Notifications
                                  </div>
                                  <FormGroup className="form-group mb-0">
                                    <Row className=" row-sm">
                                      <Col md={3}>
                                        <Form.Label className="form-label">
                                          Configure Notifications
                                        </Form.Label>
                                      </Col>
                                      <Col md={9}>
                                        <Form.Label className="d-block mg-b-15-f">
                                          <input
                                            type="checkbox"
                                            name="custom-switch-checkbox"
                                            className="custom-switch-input"
                                            defaultChecked
                                          />
                                          <span className="custom-switch-indicator"></span>
                                          <span className="text-muted ms-2">
                                            Allow all Notifications
                                          </span>
                                        </Form.Label>
                                        <Form.Label className="d-block mg-b-15-f">
                                          <input
                                            type="checkbox"
                                            name="custom-switch-checkbox"
                                            className="custom-switch-input"
                                          />
                                          <span className="custom-switch-indicator"></span>
                                          <span className="text-muted ms-2">
                                            Disable all Notifications
                                          </span>
                                        </Form.Label>
                                        <Form.Label className="d-block mg-b-15-f">
                                          <input
                                            type="checkbox"
                                            name="custom-switch-checkbox"
                                            className="custom-switch-input"
                                            defaultChecked
                                          />{" "}
                                          <span className="custom-switch-indicator"></span>
                                          <span className="text-muted ms-2">
                                            Notification Sounds
                                          </span>
                                        </Form.Label>
                                      </Col>
                                    </Row>
                                  </FormGroup>
                                </div> */}
                                 <ImageUploader />
                                <FormGroup className="form-group float-end " style={{marginTop: "20px"}}>
                                  <Row className=" row-sm">
                                    <Col md={12}>
                                      {" "}
                                      <Link
                                        className="mg-r-10 btn  my-1"
                                        to="#"
                                        style={{backgroundColor: "#FFB800",color: "white"}}
                                      >
                                        Save details
                                      </Link>{" "}
                                      <Link
                                        className="btn btn-secondary"
                                        to="#"
                                      >
                                        Delete Distributor
                                      </Link>{" "}
                                      <Link
                                        className="btn"
                                        to='/products'
                                        style={{backgroundColor: '#5CD3B9',color: "white"}}
                                      >
                                        View products
                                      </Link>{" "}
                                    </Col>
                                  </Row>
                                </FormGroup>
                              </Form>
                            </Card.Body>
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
