import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Oval } from 'react-loader-spinner';
import Validationerror from '../../../components/Validationerror';
import { useFormik } from 'formik';
import { useSignupRequest } from '../../../hooks/useSignupRequest';
import * as Yup from 'yup';


const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {sendSignupRequestUpdated,errror} = useSignupRequest();

  const signUpForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      super_admin_key: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('email is required'),
      password: Yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
      super_admin_key: Yup.string().required('Super Admin Key is required'),
    }),
    onSubmit: async (values, actions) => {
      setLoading(true);
      setError(null);

      try {
        await sendSignupRequestUpdated(values);
        if(errror) {
          setError(errror);
        }
        actions.resetForm();
      } catch (err) {
        console.error('Error submitting form:', err);
      } finally {
        setError(errror);
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
                        <h3 style={{fontWeight: 'bold',fontSize: '30px'}}>RealityRealm</h3>
                      </div>
                      <div>
                        <div className="main-signup-header">
                          {error && <Validationerror title={error} />}
                          <Form onSubmit={signUpForm.handleSubmit}>
                          <FormGroup className="form-group">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your name"
                                type="text"
                                value={signUpForm.values.name}
                                onChange={signUpForm.handleChange('name')}
                                onBlur={signUpForm.handleBlur('name')}
                                isInvalid={signUpForm.touched.name && !!signUpForm.errors.name}
                              />
                              {signUpForm.touched.name && signUpForm.errors.name && (
                                <Validationerror title={signUpForm.errors.name} />
                              )}
                            </FormGroup>
                            <FormGroup className="form-group">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                className="form-control"
                                placeholder="Enter your email address"
                                type="text"
                                value={signUpForm.values.email}
                                onChange={signUpForm.handleChange('email')}
                                onBlur={signUpForm.handleBlur('email')}
                                isInvalid={signUpForm.touched.email && !!signUpForm.errors.email}
                              />
                              {signUpForm.touched.email && signUpForm.errors.email && (
                                <Validationerror title={signUpForm.errors.email} />
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
                              style={{ backgroundColor: '#db2777', padding: '8px', borderRadius: '5px', width: '100%',border: 'none' }}
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
