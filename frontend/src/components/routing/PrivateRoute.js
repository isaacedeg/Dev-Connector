import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
  const location = useLocation();
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" from={{ state: location }} />;
  }
  return children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
