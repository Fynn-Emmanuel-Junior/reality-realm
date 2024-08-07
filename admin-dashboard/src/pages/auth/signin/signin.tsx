import { Fragment} from "react";
import { Col, Form, Row,Button } from 'react-bootstrap';
import { Link} from "react-router-dom";
import { useSignIn } from "../../../hooks/useSignIn";
import { Oval } from 'react-loader-spinner';
import Validationerror from '../../../components/Validationerror';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  const { signInUser,error,isLoading } = useSignIn();
  const signInForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required').min(5, 'Password must be at least 5 characters'),
    }),
    onSubmit: (values) => {
      signInUser(values.email, values.password);
    
    },
  });

  return (
    <Fragment>
      <div>
        <div className="page">
          <div className="page-single">
            <div className="container">
              <Row>
                <Col
                  xl={5}
                  lg={6}
                  md={8}
                  sm={8}
                  xs={10}
                  className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
                >
                  <div className="card-sigin">
                    <div className="main-card-signin d-md-flex">
                      <div className="wd-100p">
                        <div className="d-flex mb-4">
                          <p style={{fontWeight: 'bold',fontSize: '30px'}}>RealityRealm</p>
                        </div>
                        <div className="">
                          <div className="main-signup-header">
                            <div style={{ color: "#db2777", fontSize: "25px", fontWeight: 600 }}>Welcome back!</div>
                            <h6 className="font-weight-semibold mb-4">
                              Please sign in to continue.
                            </h6>
                            <div className="panel panel-primary">
                              <div className="tab-menu-heading mb-2 border-bottom-0">
                                <div className="tabs-menu1">
                                  <div
                                    className="panel-body tabs-menu-body border-0 p-3"
                                    id="tab5"
                                  >
                                    {
                                      error && <Validationerror title={error}/>
                                    }
                                    <Form  onSubmit={signInForm.handleSubmit}>
                                      <Form.Group className="form-group">
                                        <Form.Label> Email</Form.Label>{" "}
                                        <Form.Control
                                          className="form-control"
                                          placeholder="Enter your email address"
                                          type="text"
                                          value={signInForm.values.email}
                                          onChange={signInForm.handleChange('email')}
                                          onBlur={signInForm.handleBlur('email')}
                                          isInvalid={signInForm.touched.email && !!signInForm.errors.email}
                                        />
                                        {/* <Form.Control.Feedback type="invalid">
                                          {signInForm.errors.phonenumber}
                                        </Form.Control.Feedback> */}
                                        {signInForm.touched.email && signInForm.errors.email && (
                                          <Validationerror title={signInForm.errors.email} />
                                        )}
                                      </Form.Group>
                                      <Form.Group className="form-group">
                                        <Form.Label>Password</Form.Label>{" "}
                                        <Form.Control
                                          className="form-control"
                                          placeholder="Enter your password"
                                          type="password"
                                          value={signInForm.values.password}
                                          onChange={signInForm.handleChange('password')}
                                          onBlur={signInForm.handleBlur('password')}
                                          isInvalid={signInForm.touched.password && !!signInForm.errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                          {signInForm.errors.password}
                                        </Form.Control.Feedback>
                                        {signInForm.touched.password && signInForm.errors.password && (
                                          <Validationerror title={signInForm.errors.password} />
                                        )}
                                      </Form.Group>

                                      <Button
                                        type="submit"
                                        style={{ backgroundColor: "#0141CF", padding: "8px", borderRadius: "5px", width: '100%' }}
                                        disabled={isLoading}
                                      >
                                        <span style={{ color: "white" }}>
                                          {isLoading ? (
                                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                              <Oval
                                                visible={true}
                                                height="30"
                                                width="30"
                                                color="#ffffff"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                              />
                                            </div>
                                          ) : 'Sign in'}
                                        </span>
                                      </Button>
                                    </Form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="main-signin-footer text-center mt-3">
                              <p>Don't have an account?{" "}
                                <Link to='/signup'>Create an Account</Link>
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
      </div>
    </Fragment>
  );
};

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
