import React from 'react';

import { withRouter } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
const Profile = ({ classes, id, user, history, styles }) => {
  return (
    <div>
      <ProfileCard user={user} history={history} id={id} />
    </div>
  );
};

export default withRouter(Profile);
