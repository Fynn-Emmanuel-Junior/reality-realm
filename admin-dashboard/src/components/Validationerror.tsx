import React from 'react';
import * as PropTypes from 'prop-types';

// Props for the Validationerror component
type ValidationerrorProps = {
  containerStyle?: React.CSSProperties;
  onPress?: () => void; // Callback function for button press
  title?: string;
};

// Validationerror component definition
const Validationerror: React.FC<ValidationerrorProps> = ({
  containerStyle,
  onPress,
  title,
}) => {
  // Render the Validationerror component
  return (
    <div
      onClick={onPress}
      style={{
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: "#E8F0FE",
        marginBottom: "30px",
        marginTop: "10px",
        ...containerStyle,
      }}
    >
      <p style={styles.validationErrorText}>{title}</p>
    </div>
  );
};

// Styles for the component
const styles = {
  validationErrorText: {
    fontSize: '12px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: '0',
    color: 'red',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: 0
  },
};

// PropTypes for type checking
Validationerror.propTypes = {
  containerStyle: PropTypes.object,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

// Default props
Validationerror.defaultProps = {
  containerStyle: {},
  onPress: undefined,
  title: '',
};

// Export the Validationerror component as the default export
export default Validationerror;
