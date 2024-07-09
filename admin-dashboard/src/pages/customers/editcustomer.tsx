import { Fragment, useState, useEffect } from 'react';
import { Card, Col, Row, FormGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { useCustomer } from '../../hooks/useCustomer';
import Validationerror from '@/components/Validationerror';

const Profile = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [error,setError] = useState('');
  const { UpdateCustomer, GetCustomer} = useCustomer();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    idType: '',
    nin: '',
    maritalStatus: '',
    educationLevel: '',
    monthlyIncome: '',
    address1: '',
    address2: '',
    address3: '',
    firstNextOfKinName: '',
    secondNextOfKinName: '',
    firstNextOfKinPhoneNumber: '',
    secondNextOfKinPhoneNumber: '',
    firstNextOfKinRelationship: '',
    secondNextOfKinRelationship: '',
    userID: userId,
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await GetCustomer(userId);
        if (customerData) {
          const dateOfBirth = new Date(customerData.dateOfBirth);
          setFormData({
            firstname: customerData.firstname,
            surname: customerData.surname,
            phoneNumber: customerData.phoneNumber,
            dateOfBirth: dateOfBirth.toISOString().split('T')[0],
            gender: customerData.gender,
            idType: customerData.idType,
            nin: customerData.nin,
            maritalStatus: customerData.maritalStatus,
            educationLevel: customerData.educationLevel,
            monthlyIncome: customerData.monthlyIncome,
            address1: customerData.address1,
            address2: customerData.address2,
            address3: customerData.address3,
            firstNextOfKinName: customerData.firstNextOfKinName,
            secondNextOfKinName: customerData.secondNextOfKinName,
            firstNextOfKinPhoneNumber: customerData.firstNextOfKinPhoneNumber,
            secondNextOfKinPhoneNumber: customerData.secondNextOfKinPhoneNumber,
            firstNextOfKinRelationship: customerData.firstNextOfKinRelationship,
            secondNextOfKinRelationship: customerData.secondNextOfKinRelationship,
            userID: customerData._id,
          });
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await UpdateCustomer(formData);
      if(data.statusCode == 201) {
        navigate('/customer-list');
      } 

      if(data.statusCode ==  400) {
        data.message.forEach((message) => (
          setError(message)
        ));
      }
      
    } catch (error) {
      console.error('Error submitting form data:', error);
    } finally {
      setIsLoading(false);
    }
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
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Gender</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Male"
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      {/* Uncomment and adjust if dateOfBirth needs to be included */}
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Date of Birth</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="06/01/2002"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Id Type</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Id Type"
                              name="idType"
                              value={formData.idType}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">NIN</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="NINTYU783"
                              name="nin"
                              value={formData.nin}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Marital Status</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Single"
                              name="maritalStatus"
                              value={formData.maritalStatus}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Educational level</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Tertiary"
                              name="educationLevel"
                              value={formData.educationLevel}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Monthly Income</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="UGX 100,000"
                              name="monthlyIncome"
                              value={formData.monthlyIncome}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address 1</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Kampala"
                              name="address1"
                              value={formData.address1}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address 2</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Kampala"
                              name="address2"
                              value={formData.address2}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address 3</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Kampala"
                              name="address3"
                              value={formData.address3}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">First Next of Kin Name</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="First Next of Kin Name"
                              name="firstNextOfKinName"
                              value={formData.firstNextOfKinName}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Second Next of Kin Name</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="David"
                              name="secondNextOfKinName"
                              value={formData.secondNextOfKinName}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">First Next of Kin Phone Number</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="+256907648296"
                              name="firstNextOfKinPhoneNumber"
                              value={formData.firstNextOfKinPhoneNumber}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Second Next of Kin Phone Number</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="+25686782909"
                              name="secondNextOfKinPhoneNumber"
                              value={formData.secondNextOfKinPhoneNumber}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">First Next of Kin Relationship</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Mother"
                              name="firstNextOfKinRelationship"
                              value={formData.firstNextOfKinRelationship}
                              onChange={handleChange}
                            />
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Second Next of Kin Relationship</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Uncle"
                              name="secondNextOfKinRelationship"
                              value={formData.secondNextOfKinRelationship}
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
