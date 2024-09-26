import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
   const defaultUrl = "https://images.unsplash.com/photo-1727294810277-5da030783146?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Course For Everyone</h1>
        <p className="text-xl mb-8">Here we bring contents "For everyone by experts"</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <NavLink to="/courses">
            <Button size="lg">Browse Courses</Button>
          </NavLink>
          <NavLink to='/creator/signup'>
            <Button size="lg" variant="outline">Join as Creator</Button>
          </NavLink>
          <NavLink to='/learner/signup'>
            <Button size="lg" variant="outline">Join as Learner</Button>
          </NavLink>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center underline">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Web Dev", "Data Science", "DSA"].map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <img src={defaultUrl} alt="" />
                <CardTitle>{course}</CardTitle>
                <CardDescription>
                  Learn the fundamentals and advanced techniques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This course covers everything about {course.toLowerCase()}...
                </p>
              </CardContent>
              <CardFooter>
                <Button>Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Charlis Jakson",
              text: "The courses here have transformed my career...",
            },
            {
              name: "Bob Smith",
              text: "I learned more in 6 weeks than in my entire college program...",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.name}`}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-xl mb-8">
          Join thousands of students already learning on our platform
        </p>
        <NavLink to="/learner/signup">
          <Button size="lg" variant="outline">
            Sign Up Now
          </Button>
        </NavLink>
      </section>
    </div>
  );
};

export default LandingPage;
