import { Fragment, useState } from 'react';
import { Card, Col, Row, FormGroup, Form} from 'react-bootstrap';
import { useParams} from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useManager } from '../../hooks/useManager';

const Profile = () => {
  // id to get a specific manager
  const { id: managerId } = useParams();

  // hook for edit managers
  const { EditManager} = useManager();

  // const [password, setPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    managerID: managerId
  });
  const [errors, setErrors] = useState({
    firstname: '',
    surname: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Perform edit manager logic here
      await EditManager(formData);
      toast.success('Form submitted successfully');

    } catch (error) {
      console.error('Error submitting form data:', error);
      toast.error('Error submitting form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Pageheader title="Edit Manager" />
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
                              id="firstname"
                              placeholder="Firstname"
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
                              id="surname"
                              placeholder="Surname"
                              value={formData.surname}
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
                              {isLoading ? 'Submitting...' : 'Save Account'}
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
