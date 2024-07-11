import { Fragment } from 'react';
import { UserList } from './LIstingTable';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {
  return (
    <Fragment>
      <Pageheader title="Listings" />
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
