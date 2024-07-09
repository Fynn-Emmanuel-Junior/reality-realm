import { Fragment, useState, useEffect } from 'react';
import { Card, Col, Row, FormGroup, Form} from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { useLoanProduct } from '../../hooks/useLoanProduct';
import { useParams} from 'react-router-dom';
import { RootState } from '../../redux/app/store';
import { useSelector} from 'react-redux';

const Profile = () => {
  const loanproduct: any = useSelector((state: RootState) => state.loanProduct.loan_product) || [];
  const { id: Id } = useParams();
  const { UpdateLoanProduct, GetLoanProductById } = useLoanProduct();
 
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    interest_rate: '',
    min_amount: '',
    max_amount: '',
    payment_period: '',
    payment_frequency: '',
    terms_and_conditions: 'bb123HTTTUOOO1111aaaa'
  });

  useEffect(() => {
    GetLoanProductById(Id);
  if(loanproduct) {
    setFormData({
      name: loanproduct.name || '',
      type: loanproduct.type || '',
      interest_rate: loanproduct.interest_rate[0] || '',
      min_amount: loanproduct.amount[0] || '',
      max_amount: loanproduct.amount[1] || '',
      payment_period: loanproduct.payment_period || '',
      payment_frequency: loanproduct.payment_frequency || '',
      terms_and_conditions: loanproduct.terms_and_conditions || ''
    });
  }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
      setIsLoading(true);
      try {
        const formDataToSubmit = {
          ...formData,
          amount: [parseFloat(formData.min_amount), parseFloat(formData.max_amount)]
        };
        await UpdateLoanProduct(formDataToSubmit,Id);
      } catch (error) {
        throw new Error('Error submitting form data');
      } finally {
        setIsLoading(false);
      }
    
  };

  return (
    <Fragment>
      <Pageheader title="Edit Loan product" />
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
                              as="select"
                              className="form-control"
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                            >
                              <option value="">Select Name</option>
                              <option value="Smart Cash">Smart Cash</option>
                              <option value="Inventory Finance">Inventory Finance</option>
                            </Form.Control>
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
                              value={formData.type}
                              onChange={handleChange}
                            >
                              <option value="">Select Type of loan</option>
                              <option value="BusinessLoan">Business Loan</option>
                              <option value="PersonalLoan">Personal Loan</option>
                            </Form.Control>
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
                              value={formData.interest_rate}
                              onChange={handleChange}
                            />
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
                            />
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
                            />
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
                            >
                              <option value="">Select Payment frequency</option>
                              <option value="Daily">Daily</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Monthly">Monthly</option>
                            </Form.Control>
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
                            >
                              <option value="">Select Payment period</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Yearly">Yearly</option>
                            </Form.Control>
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
                              {isLoading ? 'Submitting...' : 'Edit loan product'}
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
