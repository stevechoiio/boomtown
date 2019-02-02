import React from 'react';

import { withRouter } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
const Profile = ({ classes, id, user, history, styles }) => {
  return <ProfileCard user={user} history={history} id={id} />;
};

export default withRouter(Profile);
