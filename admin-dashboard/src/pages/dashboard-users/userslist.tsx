import { Fragment, useState, useEffect } from 'react';
import { Button, Form, FormGroup, Modal, Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UserList } from './tablesfunctionaldata';
import { useManager } from "../../hooks/useManager";
import { saveFormData } from '../../components/formData';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/app/store';
import Validationerror from '../../components/Validationerror';

const Userlist = () => {

  const { signup, message, getAllManagers, GetManagers, GetRMManagers } = useManager();
  const role = useSelector((state: RootState) => state.role.role);

  useEffect(() => {
    if (role === 'SuperAdmin') {
      getAllManagers();
    } 
    if (role === 'Supervisor') {
      GetManagers();
    }
    if (role === 'Manager') {
      GetRMManagers();
    }
  }, []);

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    phonenumber: '',
    role: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ firstname?: string; surname?: string; phonenumber?: string; role?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstname) newErrors.firstname = 'Firstname is required';
    if (!formData.surname) newErrors.surname = 'Surname is required';
    if (!formData.phonenumber) newErrors.phonenumber = 'Phonenumber is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    else if (!/\d/.test(formData.password)) newErrors.password = 'Password must contain at least one number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setIsLoading(true);
      try {
        await saveFormData('manager_data', formData);
        await signup();

        handleClose();
        window.location.reload(); // Refresh the page after adding the admin

      } catch (error) {
        throw new Error('Error signing up manager');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isFormFilled = Object.values(formData).every(value => value !== '');

  return (
    <Fragment>
      <ToastContainer />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content mt-2">
          <div>
            <Link className="btn ripple" to="#" onClick={handleShow} style={{ backgroundColor: "#FFB800", color: "white" }}>
              <i className="fe fe-plus me-2"></i>Add New Admin
            </Link>
            <div style={{ marginTop: "10px" }}>
              {message && <Validationerror title={message} />}
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="modal-header">
              <h6 className="modal-title">Add Admin</h6>
              <Button variant="" className="btn-close" type="button" onClick={handleClose}>
                <span aria-hidden="true">×</span>
              </Button>
            </Modal.Header>

            <Modal.Body className="modal-body">
              <div className="p-4">
                <Form className="form-horizontal">
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      isInvalid={!!errors.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstname}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="surname"
                      placeholder="Surname"
                      value={formData.surname}
                      onChange={handleChange}
                      isInvalid={!!errors.surname}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.surname}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="phonenumber"
                      placeholder="Phonenumber"
                      value={formData.phonenumber}
                      onChange={handleChange}
                      isInvalid={!!errors.phonenumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phonenumber}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      as="select"
                      className="form-control"
                      id="role"
                      placeholder="Role"
                      value={formData.role}
                      onChange={handleChange}
                      isInvalid={!!errors.role}
                    >
                      {
                        role === 'SuperAdmin' && <>
                          <option>Select role</option>
                          <option value="Supervisor">Supervisor</option>
                          <option value="Manager">Manager</option>
                          <option value="RelationshipManager">Relationship Manager</option>
                        </>
                      }
                      {
                        role === 'Supervisor' && <>
                          <option value="">Select role</option>
                          <option value="Manager">Manager</option>
                        </>
                      }
                      {
                        role === 'Manager' && <>
                          <option value="">Select role</option>
                          <option value="RelationshipManager">Relationship Manager</option>
                        </>
                      }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.role}
                    </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Form.Control
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FormGroup>
                </Form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant=""
                className="btn ripple"
                type="button"
                style={{ background: "#FFB800", color: "white" }}
                onClick={handleSubmit} // Call handleSubmit on button click
                disabled={!isFormFilled || isLoading}
              >
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{ marginRight: "5px" }}
                  />
                ) : null}
                {isLoading ? 'Submitting...' : 'Add'}
              </Button>
              <Button variant="" className="btn ripple btn-secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
