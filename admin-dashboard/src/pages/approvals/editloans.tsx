import  { Fragment ,useState } from 'react';
import { Button, Card, Col, Form, FormGroup, Row} from 'react-bootstrap';
import Select from 'react-select';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { OptionYear, Optioncategory1 } from '../../common/selectdata';

const FormLayouts = () => {
  //year
  const [Year, setYear] = useState("");

  const handleOnchangeYear = () => {
    setYear(Year);
  };
  //year
  //Month
  const [value, setvalue] = useState("");

  const handleOnchange = () => {
    setvalue(value);
  };
  //Month
  return (
    <Fragment>
      <Pageheader title="FORM LAYOUTS"  heading="Forms"   active="Form Layouts" />
      <Row>
        <Col lg={12} md={12}>
          <Card>
            <Card.Body>
              <div className="main-content-label mg-b-5">Payment Details</div>
              <p className="mg-b-20">
                It is Very Easy to Customize and it uses in your website
                apllication.
              </p>
              <Row>
                <Col md={10} lg={12} xl={7} className="mx-auto d-block">
                  <Card.Body className="card pd-20 pd-md-40 border shadow-none">
                    <h5 className="card-title mg-b-20">Your Payment Details</h5>
                    <FormGroup className="form-group">
                      <Form.Label className="main-content-label tx-11 tx-medium tx-gray-600">
                        Name on Card
                      </Form.Label>{" "}
                      <Form.Control

                        required
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Form.Label className="main-content-label tx-11 tx-medium tx-gray-600">
                        Card Number
                      </Form.Label>
                      <div className="pos-relative">
                        <Form.Control
                          className="form-control pd-r-80"
                          required
                          type="text"
                        />
                        <div className="d-flex pos-absolute t-5 r-10">
                          <img
                            alt=""
                            className="wd-30 mg-r-5"
                            src={imagesData('visa')}
                          />{" "}
                          <img
                            alt=""
                            className="wd-30"
                            src={imagesData('mastercard')}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Row className="row-sm">
                        <Col sm={9}>
                          <Form.Label className="main-content-label tx-11 tx-medium tx-gray-600">
                            Expiration Date
                          </Form.Label>
                          <Row className="row-sm">
                            <Col sm={7}>

                              <Select
                                onChange={handleOnchange}
                                options={Optioncategory1}
                                // classNamePrefix="selectproduct"
                                classNamePrefix="Select2"
                                isSearchable
                                placeholder="Select Month"
                              />
                            </Col>
                            <Col sm={5} className="mg-t-10 mg-sm-t-0">

                              <Select
                                onChange={handleOnchangeYear}
                                options={OptionYear}
                                // classNamePrefix="selectproduct"
                                classNamePrefix="Select2"
                                isSearchable
                                placeholder="Select Year"
                              />

                            </Col>
                          </Row>
                        </Col>
                        <Col sm={3} className="mg-t-20 mg-sm-t-0">
                          <Form.Label className="main-content-label tx-11 tx-medium tx-gray-600">
                            CVC
                          </Form.Label>{" "}
                          <Form.Control

                            required
                            type="text"
                          />
                        </Col>
                      </Row>
                    </FormGroup>
                    <FormGroup className="form-group mg-b-20">
                      <label className="ckbox">
                        <input defaultChecked type="checkbox" />
                        <span className="tx-13">
                          Save my card for future purchases
                        </span>
                      </label>
                    </FormGroup>
                    <Button variant="" className="btn btn-primary btn-block">
                      Complete Payment
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
  
    </Fragment>
  );
};
FormLayouts.propTypes = {};

FormLayouts.defaultProps = {};

export default FormLayouts;
