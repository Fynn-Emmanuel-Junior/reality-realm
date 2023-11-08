import PropTypes from 'prop-types'
import Header from '../pageComponents/Header';

const MainLayout = ({children}) => {
  return (
    <div>
        <Header />
        <div>
            {children}
        </div>
    </div>
  )
}

MainLayout.propTypes = {
    children: PropTypes.node,
  };

export default MainLayout