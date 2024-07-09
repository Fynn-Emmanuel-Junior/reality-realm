import { Fragment } from 'react';
import { Button, Card, Col, Form, FormGroup, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const FormElements = () => {

  return (
    <Fragment>
      <Pageheader title="FORM ELEMENTS" heading="Forms" active="Form Elements" />
      <Row className=" row-sm">
        <Col lg={6} xl={6} md={12} sm={12}>
          <Card className="box-shadow-0">
            <Card.Header>
              <h4 className="card-title mb-1">Default Form</h4>
              <p className="mb-2">
                It is Very Easy to Customize and it uses in your website
                apllication.
              </p>
            </Card.Header>
            <Card.Body className=" pt-0">
              <Form className="form-horizontal">
                <FormGroup className="form-group">
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Name"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control
                    type="email"
                    className="form-control"
                    id="inputEmail3"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup className="form-group">
                  <Form.Control
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    placeholder="Password"
                  />
                </FormGroup>
                <FormGroup className="form-group mb-0 justify-content-end">
                  <div className="checkbox">
                    <div className="custom-checkbox custom-control">
                      <Form.Control
                        type="checkbox"
                        data-checkboxes="mygroup"
                        className="custom-control-input"
                        id="checkbox-2"
                      />
                      <Form.Label
                        htmlFor="checkbox-2"
                        className="custom-control-label mt-1"
                      >
                        Check me Out
                      </Form.Label>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup className="form-group mb-0 mt-3 justify-content-end">
                  <div>
                    <Button variant="" type="submit" className="btn btn-primary">
                      Sign in
                    </Button>
                    <Button
                      variant=""
                      type="submit"
                      className="btn btn-secondary ms-4"
                    >
                      Cancel
                    </Button>
                  </div>
                </FormGroup>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );

};

FormElements.propTypes = {};

FormElements.defaultProps = {};

export default FormElements;
