import  { Fragment } from 'react';
import {  Card, Col, Nav, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Settings = () => {
  return(
  <Fragment>

    <Pageheader title="SETTINGS"     active="Settings" />
    <Row>
      <Col lg={5}xl={5}>
        <Card className="card custom-card">
          <Card.Header className="card-header">
            <Card.Title>Settings</Card.Title>
          </Card.Header>
          <Card.Body className="main-content-left main-content-left-mail card-body">
            <div className="main-settings-menu">
              <Nav className="nav main-nav-column" >
                <Nav.Item as="li">
                  <Nav.Link className="nav-link thumb  mb-2" eventKey="Main" href='/settings/account'>
                    <i className="fe fe-home"></i> Account Information {" "}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Card.Body>
        </Card>
      </Col>
    <div>
        <Outlet />
    </div>
    </Row>

  </Fragment>
);
};
Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;
