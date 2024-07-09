import { Fragment, useState } from "react";
import { Card,Col,Row,FormGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pageheader from "../../../layout/layoutcomponent/pageheader";
import Select from 'react-select';
import { OptionTimezone } from "../../../common/selectdata";

const Profile = () =>{

  const [Timezone, setTimezone] = useState<any>("");
  const handleOnchangeTimezone = () => {
    setTimezone(Timezone);
  };

  return(
  <Fragment>

    <Pageheader title="PROFILE"  heading="Pages"   active="Profile" />
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
                                  Account
                                </div>
                                <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        User Name
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="User Name"
                                        defaultValue="Sonia Taylor"
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Email
                                      </Form.Label>
                                    </Col>
                                    <Col md={9}>
                                      <Form.Control
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        defaultValue="info@SoniaTaylor.in"
                                      />
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup
                                  className="form-group "
                                  data-select2-id="108"
                                >
                                  <Row className="" data-select2-id="107">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Language
                                      </Form.Label>
                                    </Col>
                                    <Col
                                      md={9}
                                      data-select2-id="106"
                                    >
                                      <select
                                        className="form-control select2"
                                        tabIndex={-1}
                                        aria-hidden="true"
                                      >
                                        <option>Us English</option>
                                        <option>Arabic</option>
                                        <option>Korean</option>
                                      </select>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup
                                  className="form-group "
                                  data-select2-id="10"
                                >
                                  <Row className="" data-select2-id="9">
                                    <Col md={3}>
                                      <Form.Label className="form-label">
                                        Timezone
                                      </Form.Label>
                                    </Col>
                                    <Col
                                      md={9}
                                      data-select2-id="8"
                                    >
                                      
                                        <Select
                          onChange={handleOnchangeTimezone}
                          options={OptionTimezone}
                          // classNamePrefix="selectproduct"
                          classNamePrefix="Select2"
                          isSearchable
                          placeholder="(GMT-11:00) Midway Island, Samoa"
                        />
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <FormGroup className="form-group ">
                                  <Row className=" row-sm">
                                    <Col md={3} className="col">
                                      <Form.Label className="form-label">
                                        Verification
                                      </Form.Label>
                                    </Col>
                                    <Col md={9} className="col">
                                      <Form.Label className="ckbox  mg-b-10">
                                        <input type="checkbox" />
                                        <span>Email</span>
                                      </Form.Label>
                                      <Form.Label className="ckbox  mg-b-10">
                                        <input defaultChecked type="checkbox" />
                                        <span>SMS</span>
                                      </Form.Label>
                                      <Form.Label className="ckbox  mg-b-10">
                                        <input type="checkbox" />
                                        <span>Phone</span>
                                      </Form.Label>
                                    </Col>
                                  </Row>
                                </FormGroup>
                                <div className="mb-4 main-content-label">
                                  Secuirity Settings
                                </div>
                                <FormGroup className="form-group ">
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
                                </FormGroup>
                                <FormGroup className="form-group ">
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
                                </FormGroup>
                                <div>
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
                                </div>
                                <FormGroup className="form-group float-end">
                                  <Row className=" row-sm">
                                    <Col md={12}>
                                      {" "}
                                      <Link
                                        className="mg-r-10 btn btn-primary my-1"
                                        to="#"
                                      >
                                        Deactivate Account
                                      </Link>{" "}
                                      <Link
                                        className="btn btn-secondary"
                                        to="#"
                                      >
                                        Change Password
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
