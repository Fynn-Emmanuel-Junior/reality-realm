import { Fragment } from 'react';
import { UserList } from './appointmentTable';
import Pageheader from '../../layout/layoutcomponent/pageheader';

const Userlist = () => {
  return (
    <Fragment>
      <Pageheader title="Appointments" />
      <UserList />
    </Fragment>
  );
};

Userlist.propTypes = {};

Userlist.defaultProps = {};

export default Userlist;
