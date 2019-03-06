import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
const Profile = ({ classes, id, user, history, styles }) => {
  return <ProfileCard user={user} history={history} id={id} />;
};

ProfileCard.propTypes = {
  classes: PropTypes.object,
  id: PropTypes.string,
  history: PropTypes.string,
  styles: PropTypes.object
};

export default withRouter(Profile);
