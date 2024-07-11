import { Fragment,useState } from 'react';
import { Card, Col, Row, FormGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Profile = () => {
  const { id: userId } = useParams();
  const [customer,setCustomer] = useState({
    firstname: '',
    surname: '',
    phoneNumber: '',
    userID: userId,
});

  return (
    <Fragment>
      <Pageheader title="Customer Profile" />
      <Row>
        <Col lg={12} md={12}>
          <span className="py-0">
            <div className="profile-tab tab-menu-heading border-bottom-0">
              <div className="main-content-body tab-pane border-0" id="settings">
                <Card>
                  <Card.Body className="border-0">
                    <Form className="form-horizontal">
                      <div className="mb-4 main-content-label">Account</div>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Firstname</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Firstname"
                              name="firstname"
                              value={customer.firstname || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Surname</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Surname"
                              name="surname"
                              value={customer.surname || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Phonenumber</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Phonenumber"
                              name="phonenumber"
                              value={customer.phoneNumber || ''}
                              disabled
                            />
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
    </Fragment>
  );
};

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;