import { Fragment, useEffect } from 'react';
import { Navbar, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';
import * as Switcherdata from '../../common/switcherdata';
import { FiUser } from 'react-icons/fi';
import { useLogout } from '../../hooks/useLogout';


export default function Header() {
  
  useEffect(() => {
    Switcherdata.localStorageBackUp();
  }, []);

  // FullScreen
  //leftsidemenu
  const openCloseSidebar = () => {
    document.body.classList.toggle('sidenav-toggled');
  };

  //useNavigation
  const navigate = useNavigate();

  //logout hooks
  const { logout } = useLogout();

  const handleLogout = () => {
    logout().then((res: any) => {
      if (res) {
        navigate('/');
      } else {
        console.log('cannot logged out');
      }
    });
  };

  return (
    <Fragment>
      <Navbar className="main-header side-header sticky nav nav-item" style={{ marginBottom: '-63px' }}>
        <div className="main-container container-fluid">
          <div className="main-header-left ">
            <div className="responsive-logo">
              <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard1/`} className="header-logo">
                <img
                  src={imagesData('logo')}
                  className="mobile-logo logo-1 responsive"
                  alt="logo"
                  style={{
                    width: 35,
                  }}
                />
                <img src={imagesData('logowhite')} className="mobile-logo dark-logo-1" alt="logo" />
              </Link>
            </div>
            <div
              className="app-sidebar__toggle"
              data-bs-toggle="sidebar"
              onClick={() => openCloseSidebar()}
            >
              <Link className="open-toggle" to="#">
                <i className="header-icon fe fe-align-left"></i>
              </Link>
              <Link className="close-toggle" to="#">
                <i className="header-icon fe fe-x"></i>
              </Link>
            </div>
            <div className="logo-horizontal">
              <Link to={`${import.meta.env.BASE_URL}dashboard/dashboard1/`} className="header-logo">
                <img src={imagesData('logo')} className="mobile-logo logo-1" alt="logo" />
                <img src={imagesData('logowhite')} className="mobile-logo dark-logo-1" alt="logo" />
              </Link>
            </div>
          </div>
          <div className="main-header-right">
            <Navbar.Toggle className="navresponsive-toggler d-lg-none ms-auto" type="button">
              <span className="navbar-toggler-icon fe fe-more-vertical"></span>
            </Navbar.Toggle>
            <div className="mb-0 navbar navbar-expand-lg navbar-nav-right responsive-navbar navbar-dark p-0">
              <Navbar.Collapse className="collapse" id="navbarSupportedContent-4">
                <ul className="nav nav-item header-icons navbar-nav-right pe-0">
                  <Dropdown className="main-profile-menu nav nav-item nav-link ps-lg-2 m-0">
                    <Dropdown.Toggle className="new nav-link profile-user d-flex" variant="">
                      <FiUser size={20} color="#000000" style={{ marginTop: '8px', opacity: '0.5' }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="menu-header-content p-3 border-bottom">
                        <div className="d-flex wd-100p">
                          <div className="main-img-user">
                            <img alt="" src={imagesData('female2')} className="" />
                          </div>
                          <div className="ms-3 my-auto">
                            <h6 className="tx-15 font-weight-semibold mb-0">
                            
                            </h6>
                            <span className="dropdown-title-text subtext op-6 tx-12">
                           
                            </span>
                          </div>
                        </div>
                      </div>
                      <Dropdown.Item className="dropdown-item" href={`/settings`}>
                        <i className="far fa-sun"></i> Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        <i className="far fa-arrow-alt-circle-left"></i> Log Out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </ul>
              </Navbar.Collapse>
            </div>
          </div>
        </div>
      </Navbar>
      <div className="jumps-prevent" style={{ paddingTop: '63px' }}></div>
    </Fragment>
  );
}

Header.propTypes = {};

Header.defaultProps = {};
