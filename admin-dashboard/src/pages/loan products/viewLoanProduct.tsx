import { Fragment} from 'react';
import { UserList } from './LoanProductsTable';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {
  return (
    <Fragment>
      <Pageheader title="Loan Products" />
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
