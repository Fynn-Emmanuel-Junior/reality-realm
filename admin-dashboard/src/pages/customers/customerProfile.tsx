import { Fragment, useEffect,useState } from 'react';
import { Card, Col, Row, FormGroup, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { useCustomer } from '@/hooks/useCustomer';
import Image from '@/components/Image';

const Profile = () => {
  const { id: userId } = useParams();
  const { GetCustomer } = useCustomer();
  const [customer,setCustomer] = useState({
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
    profileImage: '',
    idImageFront: '',
    idImageBack: '',
    firstNextOfKinName: '',
    secondNextOfKinName: '',
    firstNextOfKinPhoneNumber: '',
    secondNextOfKinPhoneNumber: '',
    firstNextOfKinRelationship: '',
    secondNextOfKinRelationship: '',
    userID: userId,
});

  useEffect(() => {
   const fetchCustomer = async() => {
    const customerData = await GetCustomer(userId);
    if(customerData) {
      const dateOfBirth = new Date(customerData.dateOfBirth);
      setCustomer({
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
            profileImage: customerData.profileImage,
            idImageFront: customerData.idImageFront,
            idImageBack: customerData.idImageBack,
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
  };
   
   fetchCustomer();
  }, []);

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

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Gender</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Gender"
                              name="gender"
                              value={customer.gender || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Date of Birth</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="date"
                              className="form-control"
                              name="dateOfBirth"
                              value={customer.dateOfBirth ? customer.dateOfBirth.split('T')[0] : ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      {/* <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Region</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Region"
                              name="region"
                              value={customer.region || ''}
                            />
                          </Col>
                        </Row>
                      </FormGroup> */}

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Profile Image</Form.Label>
                          </Col>
                          <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                            {customer.profileImage ? (
                              <Image
                                id={customer.profileImage}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                              ></Image>
                            ) : (
                              <span> No image found</span>
                            )}
                          </div>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Id Image Front</Form.Label>
                          </Col>
                          <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                            {customer.idImageFront ? (
                              <Image
                                id={customer.idImageFront}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                              ></Image>
                            ) : (
                              <span> No image found</span>
                            )}
                          </div>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Id Image Back</Form.Label>
                          </Col>
                          <div className="md:w-1/2" style={{ width: '50%', height: '120px' }}>
                            {customer.idImageBack ? (
                              <Image
                                id={customer.idImageBack}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                              ></Image>
                            ) : (
                              <span> No image found</span>
                            )}
                          </div>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">ID Type</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="ID Type"
                              name="idType"
                              value={customer.idType || ''}
                              disabled
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
                              placeholder="NIN"
                              name="nin"
                              value={customer.nin || ''}
                              disabled
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
                              placeholder="Marital Status"
                              name="maritalStatus"
                              value={customer.maritalStatus || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Education Level</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Education Level"
                              name="educationLevel"
                              value={customer.educationLevel || ''}
                              disabled
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
                              placeholder="Monthly Income"
                              name="monthlyIncome"
                              value={customer.monthlyIncome || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      {/* <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Salary Pay Day</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              name="salaryPayDay"
                              value={customer.salaryPayDay || ''}
                            />
                          </Col>
                        </Row>
                      </FormGroup> */}

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address1</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Address1"
                              name="address1"
                              value={customer.address1 || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address2</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Address2"
                              name="address2"
                              value={customer.address2 || ''}
                              disabled
                            />
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Address3</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              placeholder="Address3"
                              name="address3"
                              value={customer.address3 || ''}
                              disabled
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
                              value={customer.firstNextOfKinName || ''}
                              disabled
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
                              placeholder="Second Next of Kin Name"
                              name="secondNextOfKinName"
                              value={customer.secondNextOfKinName || ''}
                              disabled
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
                              placeholder="First Next of Kin Phone Number"
                              name="firstNextOfKinPhoneNumber"
                              value={customer.firstNextOfKinPhoneNumber || ''}
                              disabled
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
                              placeholder="Second Next of Kin Phone Number"
                              name="secondNextOfKinPhoneNumber"
                              value={customer.secondNextOfKinPhoneNumber || ''}
                              disabled
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
                              placeholder="First Next of Kin Relationship"
                              name="firstNextOfKinRelationship"
                              value={customer.firstNextOfKinRelationship || ''}
                              disabled
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
                              placeholder="Second Next of Kin Relationship"
                              name="secondNextOfKinRelationship"
                              value={customer.secondNextOfKinRelationship || ''}
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