
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
return (
    <div className="main-footer">
    <Col md={12} sm={12} className=" text-center">
        <div className="container-fluid pt-0 ht-100p">
          Copyright © 2023{" "}
          <Link to="#" style={{color: "#0141CF"}}>
            Cloud Capital Finance
          </Link>
          {/* . Designed with <span className="fa fa-heart text-danger"></span> by
          <Link to="#"> Spruko </Link> All rights reserved */}
        </div>
      </Col>
    </div>
); }

