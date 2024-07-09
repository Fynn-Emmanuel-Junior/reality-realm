import { Fragment, useState } from 'react';
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { UserList } from './tablesfunctionaldata';

const Userlist = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Fragment>
			<div className="breadcrumb-header justify-content-between">
				<div className="left-content mt-2">
					<Link 
						className="btn ripple" 
						to="#" onClick={handleShow}
						style={{backgroundColor: "#FFB800",color: "white"}}
					><i className="fe fe-plus me-2"></i>Add Products</Link>

					<Modal show={show} onHide={handleClose}>
						<Modal.Header className="modal-header">
							<h6 className="modal-title">Add Product</h6>
							<Button variant="" className="btn-close" type="button" onClick={handleClose}>
								<span aria-hidden="true">×</span></Button>
						</Modal.Header>

						<Modal.Body className="modal-body"> <div className="p-4">
							<Form className="form-horizontal">
								<FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName" placeholder="Product name" />
								</FormGroup>
								<FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName1" placeholder="Product description" />
								</FormGroup>
								<FormGroup className="form-group">
									<Form.Control type="number" className="form-control" id="inputEmail3" placeholder="Amount" />
								</FormGroup>
								<FormGroup className="form-group">
									<Form.Control type="text" className="form-control" id="inputName" placeholder="Distributors name" />
								</FormGroup>
								<FormGroup className="form-group">
									
								</FormGroup>
								<FormGroup className="form-group mb-0 justify-content-end">
									<div className="checkbox">
										<div className="custom-checkbox custom-control">
											<input type="checkbox" data-checkboxes="mygroup" className="custom-control-input" id="checkbox-2" />
											<label htmlFor="checkbox-2" className="custom-control-label mt-1 text-dark"> New Product</label>
										</div>
									</div>
								</FormGroup>
							</Form>
						</div>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="" className="btn ripple" type="button" style={{backgroundColor: "#FFB800",color: "white"}}>
								Add
							</Button>
							<Button variant="" className="btn ripple btn-secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
					<UserList/>
		
		</Fragment>
	);
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
