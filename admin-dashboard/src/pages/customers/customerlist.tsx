import { Fragment} from 'react';
import { UserList } from './tablesfunctionaldata';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {

	return (
		<Fragment>
			<Pageheader title="Customers" />
			<UserList/>
		</Fragment>
	);
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
