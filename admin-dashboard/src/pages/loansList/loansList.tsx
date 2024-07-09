import { Fragment, useState } from 'react';
import LoanApplicationsList from "./tablesfunctionaldata";

import LoanApplicationModal from '@/common/LoanApplicationModal';

const Userlist = () => {
	const [show, setShow] = useState(false);
	const [selectedLoan, setSelectedLoan] = useState({});

	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (row) => {
		setSelectedLoan(row.original);
		setShow(true);
	};

	return (
		<Fragment>
			<LoanApplicationModal selectedLoan={selectedLoan} show={show} handleClose={handleClose} />
			<LoanApplicationsList handleShow={handleShow}/>
		</Fragment>
	);
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
