import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { imagesData } from '../../../common/commonimages';
import { Oval } from 'react-loader-spinner';
import Validationerror from '../../../components/Validationerror';
import { saveFormData } from '../../../components/formData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignupRequest } from '../../../hooks/useSignupRequest';

const SignUp = () => {
  const { sendSignupRequestUpdated, errror } = useSignupRequest();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUpForm = useFormik({
    initialValues: {
      firstname: '',
      surname: '',
      phoneNumber: '',
      password: '',
      super_admin_key: '',
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required('First name is required'),
      surname: Yup.string().required('Surname is required'),
      phoneNumber: Yup.string().required('Please enter a valid phone number to continue.'),
      password: Yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
      super_admin_key: Yup.string().required('Super Admin Key is required'),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      setError(null);

      try {
        await saveFormData('formData', { ...values, role: 'SuperAdmin' });
        await sendSignupRequestUpdated();
      } catch (err) {
        console.error('Error submitting form:', err);
        setError('An error occurred while submitting the form.');
      } finally {
        setLoading(false);
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Fragment>
      <div>
        <div className="page">
          <div className="container">
            <Row>
              <Col xl={5} lg={6} md={8} sm={8} xs={10} className="card-sigin-main py-4 justify-content-center mx-auto">
                <div className="card-sigin">
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard1/`}>
                          <img src={imagesData('favicon')} className="sign-favicon ht-40" alt="logo" />
                        </Link>
                      </div>
                      <div>
                        <div className="main-signup-header">
                          <div style={{ color: '#0141CF', fontSize: '25px', fontWeight: 600 }}>Get Started!</div>
                          <h6 className="font-weight-normal mb-4 text-dark">
                            It's free to signup and only takes a minute.
                          </h6>
                          {error && <Validationerror title={error} />}
                          {errror && <Validationerror title={errror} />}
                          <Form onSubmit={signUpForm.handleSubmit}>
                            <FormGroup className="form-group">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your first name"
                                type="text"
                                value={signUpForm.values.firstname}
                                onChange={signUpForm.handleChange('firstname')}
                                onBlur={signUpForm.handleBlur('firstname')}
                                isInvalid={signUpForm.touched.firstname && !!signUpForm.errors.firstname}
                              />
                              {signUpForm.touched.firstname && signUpForm.errors.firstname && (
                                <Validationerror title={signUpForm.errors.firstname} />
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Surname</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your surname"
                                type="text"
                                value={signUpForm.values.surname}
                                onChange={signUpForm.handleChange('surname')}
                                onBlur={signUpForm.handleBlur('surname')}
                                isInvalid={signUpForm.touched.surname && !!signUpForm.errors.surname}
                              />
                              {signUpForm.touched.surname && signUpForm.errors.surname && (
                                <Validationerror title={signUpForm.errors.surname} />
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Phone Number</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your phone number"
                                type="text"
                                value={signUpForm.values.phoneNumber}
                                onChange={signUpForm.handleChange('phoneNumber')}
                                onBlur={signUpForm.handleBlur('phoneNumber')}
                                isInvalid={signUpForm.touched.phoneNumber && !!signUpForm.errors.phoneNumber}
                              />
                              {signUpForm.touched.phoneNumber && signUpForm.errors.phoneNumber && (
                                <Validationerror title={signUpForm.errors.phoneNumber} />
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your password"
                                type="password"
                                value={signUpForm.values.password}
                                onChange={signUpForm.handleChange('password')}
                                onBlur={signUpForm.handleBlur('password')}
                                isInvalid={signUpForm.touched.password && !!signUpForm.errors.password}
                              />
                              {signUpForm.touched.password && signUpForm.errors.password && (
                                <Validationerror title={signUpForm.errors.password} />
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Super Admin Key</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your super admin key"
                                type="text"
                                value={signUpForm.values.super_admin_key}
                                onChange={signUpForm.handleChange('super_admin_key')}
                                onBlur={signUpForm.handleBlur('super_admin_key')}
                                isInvalid={signUpForm.touched.super_admin_key && !!signUpForm.errors.super_admin_key}
                              />
                              {signUpForm.touched.super_admin_key && signUpForm.errors.super_admin_key && (
                                <Validationerror title={signUpForm.errors.super_admin_key} />
                              )}
                            </FormGroup>
                            <Button
                              type="submit"
                              style={{ backgroundColor: '#0141CF', padding: '8px', borderRadius: '5px', width: '100%' }}
                              disabled={loading}
                            >
                              <span style={{ color: 'white' }}>
                                {loading ? (
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Oval
                                      visible={true}
                                      height="30"
                                      width="30"
                                      color="#ffffff"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                    />
                                  </div>
                                ) : (
                                  'Create Account'
                                )}
                              </span>
                            </Button>
                          </Form>
                          <div className="main-signup-footer mt-3 text-center">
                            <p>
                              Already have an account? <Link to="/">Sign In</Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SignUp.propTypes = {};

SignUp.defaultProps = {};

export default SignUp;
