import { FormGroup,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <section className="card-body Basicwizard"  style={{width: "50vw"}}>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Old password </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder="******"

              />
            </FormGroup>
            <FormGroup className="control-group form-group">
              <Form.Label className="form-label"> New passoword </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                required
                placeholder="*******"
              />
            </FormGroup>
			<FormGroup className="control-group form-group">
              <Form.Label className="form-label"> Confirm password </Form.Label>
              <Form.Control
                type="email"
                className="form-control"
                required
                placeholder="*******"
              />
            </FormGroup>
			
            <Link className="btn ripple" to="#"  style={{backgroundColor: "#FFB800",color: "white"}}> Update changes </Link>
        
          </section>
  );
};

export default Account;
