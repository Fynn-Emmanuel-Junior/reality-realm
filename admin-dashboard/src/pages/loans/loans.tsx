import { Fragment } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { Basicwizard} from './formwizarddata';

const FormWizard = () =>{

return (
  <Fragment>

    <Pageheader title="Loans"/>
    <Row>
      <Col lg={12} md={12}>
        <Card>
          <Card.Body>
            {/* <div className="main-content-label mg-b-5">
              Basic Content Wizard
            </div>
            <p className="mg-b-20">
              It is Very Easy to Customize and it uses in your website
              apllication.
            </p> */}

            <div id="wizard1" className="border">
              <Basicwizard  />

            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Fragment>
); };

FormWizard.propTypes = {};

FormWizard.defaultProps = {};

export default FormWizard;
