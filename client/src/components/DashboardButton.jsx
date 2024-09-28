import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardButton = () => {
  const currentLearner = useSelector((state) => state.learner.currentLearner);
  const currentCreator = useSelector((state) => state.creator.currentCreator);

  if (currentLearner) {
    return (
      <NavLink to="/learner/dashboard">
      <Button className="mx-8 bg-blue-600">Go to Dashboard</Button>
    </NavLink>
    );
  }

  if (currentCreator) {
    return (
      <NavLink to="/creator/dashboard">
      <Button className="mx-8 bg-blue-600">Go to Dashboard</Button>
    </NavLink>
    );
  }

  return (
    <NavLink to="/creator/signup">
      <Button className="mx-8" variant="outline">Join as creator</Button>
    </NavLink>
  );
};

export default DashboardButton;