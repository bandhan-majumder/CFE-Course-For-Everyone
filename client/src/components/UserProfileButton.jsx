import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const UserProfileButton = () => {
  const currentLearner = useSelector((state) => state.learner.currentLearner);
  const currentCreator = useSelector((state) => state.creator.currentCreator);

  if (currentLearner) {
    return (
      <Avatar>
        <AvatarImage src={currentLearner.profilePicture} alt="Learner profile" />
      </Avatar>
    );
  }

  if (currentCreator) {
    return (
      <Avatar>
        <AvatarImage src={currentCreator.profilePicture} alt="Creator profile" />
      </Avatar>
    );
  }

  return (
    <NavLink to="/learner/signup">
      <Button className="mx-8">Join now</Button>
    </NavLink>
  );
};

export default UserProfileButton;