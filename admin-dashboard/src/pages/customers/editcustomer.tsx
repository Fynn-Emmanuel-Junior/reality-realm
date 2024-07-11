import { Fragment, useState} from 'react';
import { Card, Col, Row, FormGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import Validationerror from '../../components/Validationerror';

const Profile = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    phoneNumber: '',
    userID: userId,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

  };

  return (
    <Fragment>
      <Pageheader title="Edit Customer Profile" />
      {
        error && <Validationerror title={error}/>
      }
      <Row>
        <Col lg={12} md={12}>
          <span className="py-0">
            <div className="profile-tab tab-menu-heading border-bottom-0">
              <div className="main-content-body tab-pane border-0" id="settings">
                <Card>
                  <Card.Body className="border-0">
                    <Form className="form-horizontal" onSubmit={handleSubmit}>
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
                              placeholder="Afasha"
                              name="firstname"
                              value={formData.firstname}
                              onChange={handleChange}
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
                              placeholder="Afasha"
                              name="surname"
                              value={formData.surname}
                              onChange={handleChange}
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
                              placeholder="+256098712341"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
  
                      <FormGroup className="form-group float-end">
                        <Row className="row-sm">
                          <Col md={12}>
                            <div
                              className="mg-r-10 my-1"
                              style={{ backgroundColor: '#FFB800', color: 'white',padding: '10px',borderRadius: '5px',cursor: 'pointer'}}
                              onClick={handleSubmit}
                            >
                              {isLoading ? 'Submitting...' : 'Update customer'}
                            </div>
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
