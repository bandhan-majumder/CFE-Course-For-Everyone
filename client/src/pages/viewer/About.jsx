import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="about-page">
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">
            Welcome to CFE, where we make "Course For Everyone, by Experts".
          </p>
          <NavLink to="/courses">
            <Button className="bg-blue-500 text-white">
              Explore Our Courses
            </Button>
          </NavLink>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto text-left">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            dolorem ducimus tempora asperiores consequuntur consequatur
            reiciendis pariatur, provident laudantium neque enim, ex, voluptas
            amet quae harum assumenda eaque voluptatem ipsa necessitatibus vero
            dolores. Iste?
          </p>

          <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
          <ul className="list-disc list-inside mb-4">
            <li>Web Development Courses.</li>
            <li>Cyber Security Courses</li>
            <li>AI/ML courses</li>
            <li>Data Science courses</li>
            <li>DevOps courses</li>
            <li>CS fundamental courses</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <p className="mb-4">We are guided by the following core values:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Innovation</li>
            <li>Expert mentorship</li>
            <li>Premium content</li>
          </ul>

          <h2 className="text-3xl font-bold mb-6">Join Us Today!</h2>
          <p className="mb-4">
            Whether you are looking to enhance your skills, switch careers, or
            pursue a passion project, CFE is here to support you every step of
            the way. Join our community of learners today and start your journey
            towards success!
          </p>
          <NavLink to="/api/">
            <Button className="bg- text-white">Explore Our Course</Button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default About;
