import { Fragment } from 'react';
import { UserList } from './guarantorTable';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {
  return (
    <Fragment>
      <Pageheader title="Guarantors" />
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;