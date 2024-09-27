import { useState } from "react";

import Header from "./components/Header";
import LearnerSignIn from "./pages/learner/SignIn";
import LearnerSignUp from "./pages/learner/SignUp";
import LearnerDashboard from "./pages/learner/Dashboard"
import CreatorSignIn from "./pages/creator/SignIn";
import CreatorSignUp from "./pages/creator/SignUp";
import CreatorDashboard from "./pages/creator/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/viewer/Home";
import About from "./pages/viewer/About";
import Courses from "./pages/viewer/Courses";
import Contact from "./pages/viewer/Contact";
import CreateCourse from "./pages/creator/CreateCourse";
import UpdateCourse from "./pages/creator/UpdateCourse";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          {/* viewers routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Learner auth routes */}
          <Route path="/learner/signup" element={<LearnerSignUp />} />
          <Route path="/learner/signin" element={<LearnerSignIn />} />
          <Route path="/learner/dashboard" element={<LearnerDashboard />} />

          {/* Creator routes */}
          <Route path="/creator/signup" element={<CreatorSignUp />} />
          <Route path="/creator/signin" element={<CreatorSignIn />} />
          <Route path="/creator/dashboard" element={<CreatorDashboard />} />
          <Route path="/creator/create/course" element={<CreateCourse />} />
          <Route path="/creator/update/course" element={<UpdateCourse />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
