import { Fragment, useState } from 'react';
import { Card, Col, Row, FormGroup, Form} from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { useLoanProduct } from '../../hooks/useLoanProduct';

const Profile = () => {
  const { CreateLoanProduct } = useLoanProduct();

  const [formData, setFormData] = useState({
    name: '',
    type_of_loan: '',
    interest_rate: '',
    min_amount: '',
    max_amount: '',
    payment_period: '',
    payment_frequency: '',
    terms_and_conditions: 'bb123HTTTUOyyO'
  });

  const [errors, setErrors] = useState({
    name: '',
    type_of_loan: '',
    interest_rate: '',
    min_amount: '',
    max_amount: '',
    payment_period: '',
    payment_frequency: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    const newValue = id === 'interest_rate' || id === 'amount' ? parseFloat(value) : value;
    setFormData({ ...formData, [id]: newValue });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.type_of_loan) newErrors.type_of_loan = 'Type of loan is required';
    if (!formData.interest_rate) newErrors.interest_rate = 'Interest rate is required';
    if (!formData.min_amount) newErrors.min_amount = 'Minimum amount is required';
    if (!formData.max_amount) newErrors.max_amount = 'Maximum amount is required';
    if (!formData.payment_period) newErrors.payment_period = 'Payment period is required';
    if (!formData.payment_frequency) newErrors.payment_frequency = 'Payment frequency is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        const formDataToSubmit = {
          ...formData,
          amount: [parseFloat(formData.min_amount), parseFloat(formData.max_amount)]
        };
        await CreateLoanProduct(formDataToSubmit);
      } catch (error) {
        throw new Error('Error submitting form data');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Fragment>
      <Pageheader title="Create Loan product" />
      <Row>
        <Col lg={12} md={12}>
          <span className="py-0">
            <div className="profile-tab tab-menu-heading border-bottom-0">
              <div className="main-content-body tab-pane border-0" id="settings">
                <Card>
                  <Card.Body className="border-0">
                    <Form className="form-horizontal">
                      <div className="mb-4 main-content-label">Product</div>
                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Name</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Product Name"
                              value={formData.name}
                              onChange={handleChange}
                              isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Type of loan</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              as="select"
                              className="form-control"
                              id="type_of_loan"
                              value={formData.type_of_loan}
                              onChange={handleChange}
                              isInvalid={!!errors.type_of_loan}
                            >
                              <option value="">Select Type of loan</option>
                              <option value="BusinessLoan">Business Loan</option>
                              <option value="PersonalLoan">Personal Loan</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.type_of_loan}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Interest rate</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="interest_rate"
                              placeholder="Interest rate"
                              value={formData.interest_rate || ''}
                              onChange={handleChange}
                              isInvalid={!!errors.interest_rate}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.interest_rate}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Minimum Amount</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="min_amount"
                              placeholder="Minimum Amount"
                              value={formData.min_amount}
                              onChange={handleChange}
                              isInvalid={!!errors.min_amount}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.min_amount}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Maximum Amount</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              type="text"
                              className="form-control"
                              id="max_amount"
                              placeholder="Maximum Amount"
                              value={formData.max_amount}
                              onChange={handleChange}
                              isInvalid={!!errors.max_amount}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.max_amount}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Payment frequency</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              as="select"
                              className="form-control"
                              id="payment_frequency"
                              value={formData.payment_frequency}
                              onChange={handleChange}
                              isInvalid={!!errors.payment_frequency}
                            >
                              <option value="">Select Payment frequency</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.payment_frequency}
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </FormGroup>

                      <FormGroup className="form-group">
                        <Row className="row-sm">
                          <Col md={3}>
                            <Form.Label className="form-label">Payment period</Form.Label>
                          </Col>
                          <Col md={9}>
                            <Form.Control
                              as="select"
                              className="form-control"
                              id="payment_period"
                              value={formData.payment_period}
                              onChange={handleChange}
                              isInvalid={!!errors.payment_period}
                            >
                              <option value="">Select Payment period</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                              {errors.payment_period}
                            </Form.Control.Feedback>
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
                              {isLoading ? 'Submitting...' : 'Create product'}
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
