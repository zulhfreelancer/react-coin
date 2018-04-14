import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = (props) => {
  const {width, height} = props;

  return <div className="Loading" style={{ width: width, height: height }} />;
}

Loading.defaultProps = {
  width: '28px',
  height: '28px'
}

Loading.propTypes = {
  width: PropTypes.string, // optional
  height: PropTypes.string // optional
}

export default Loading;
