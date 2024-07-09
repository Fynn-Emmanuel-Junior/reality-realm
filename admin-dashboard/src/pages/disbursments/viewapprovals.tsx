import { Fragment,useState } from 'react';
import {  Card, Col, Row } from 'react-bootstrap';
import Pageheader from '../../layout/layoutcomponent/pageheader';
import { BasicTable} from './tablesfunctionaldata';
import LoanApplicationModal from '@/common/LoanApplicationModal';

const DataTables = () => {

  const [show, setShow] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState({});

	const handleClose = () => setShow(false);
	const handleShow = (row: object) => {
		setSelectedLoan(row);
		setShow(true);
	};

  return(
  <Fragment>
    <div className="main-container container-fluid">
    
      <Pageheader title="Loans Ready for disbursment" />
	<LoanApplicationModal selectedLoan={selectedLoan} show={show} handleClose={handleClose} />
      <Row className=" row-sm">
        <Col lg={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body>
              <div className="table-responsive">
                <BasicTable handleShow={handleShow}/>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
   </div>
  </Fragment>
); };

DataTables.propTypes = {};

DataTables.defaultProps = {};

export default DataTables;
