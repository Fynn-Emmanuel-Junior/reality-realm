import React, { useState, useEffect } from 'react';
import { FormGroup, Form} from 'react-bootstrap';
import { useSelector} from 'react-redux';
import { RootState } from '@/redux/app/store';
import { useSignIn } from '../../hooks/useSignIn';

const Account = () => {
  const profileData = useSelector((state: RootState) => state.profile.data);
  const { EditProfile } = useSignIn();

  const [formData, setFormData] = useState({
    firstname: '',
    surname: '',
    role: '',
    phoneNumber: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        firstname: profileData.firstname || '',
        surname: profileData.surname || '',
        role: profileData.role,
        phoneNumber: profileData.phoneNumber,
      });
    }
  }, [profileData]); // Depend on profileData to only run when it changes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      await EditProfile(formData);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <section className="card-body Basicwizard" style={{ width: '50vw' }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="control-group form-group">
          <Form.Label className="form-label">Firstname</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="firstname"
            required
            placeholder="Name"
            value={formData.firstname}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="control-group form-group">
          <Form.Label className="form-label">Surname</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="surname"
            required
            placeholder="Name"
            value={formData.surname}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="control-group form-group">
          <Form.Label className="form-label">Role</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="role"
            required
            placeholder="Role"
            value={formData.role}
            disabled={true}
          />
        </FormGroup>
        <FormGroup className="control-group form-group">
          <Form.Label className="form-label">Phone number</Form.Label>
          <Form.Control
            type="text"
            className="form-control"
            id="phoneNumber"
            required
            placeholder="+256-905678965"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>
        <button type="submit" className="btn ripple" style={{ backgroundColor: '#FFB800', color: 'white' }}>
          {isLoading ? 'Updating...' : 'Update changes'}
        </button>
      </Form>
    </section>
  );
};

export default Account;
