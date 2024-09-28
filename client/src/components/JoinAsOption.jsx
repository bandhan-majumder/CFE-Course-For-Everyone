import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const JoinAsOption = () => {
  const currentLearner = useSelector((state) => state.learner.currentLearner);
  const currentCreator = useSelector((state) => state.creator.currentCreator);

  if (currentLearner) {
    return (
      <NavLink to="/creator/signup">
      <Button className="mx-8">Join as creator</Button>
    </NavLink>
    );
  }

  if (currentCreator) {
    return (
      <NavLink to="/learner/signin">
      <Button className="mx-8">Join as Learner</Button>
    </NavLink>
    );
  }

  return (
    <NavLink to="/learner/signup">
      <Button className="mx-8">Join as Learner</Button>
    </NavLink>
  );
};

export default JoinAsOption;