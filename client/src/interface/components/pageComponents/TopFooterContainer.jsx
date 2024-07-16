import PropTypes from 'prop-types';

const TopFooterContainer = ({ children }) => {
  return (
    <div className="lg:hidden w-full bg-gray-100 p-4 shadow-md z-20 sticky bottom-0">
      {children}
    </div>
  );
};

TopFooterContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TopFooterContainer;