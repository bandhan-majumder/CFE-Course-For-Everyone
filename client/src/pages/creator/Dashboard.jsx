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
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const defaultUrl =
    "https://images.unsplash.com/photo-1727294810277-5da030783146?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Thanks for joining us as creator
        </h1>
        <p className="text-xl mb-8">
          Here we bring contents "For everyone by experts"
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <NavLink to="/courses">
            <Button size="lg" variant="outline">Browse Courses</Button>
          </NavLink>
          <NavLink to="/creator/create/course">
            <Button size="lg">Create course</Button>
          </NavLink>
          <NavLink to="/learner/signup">
            <Button size="lg" variant="outline">
              Join as Learner
            </Button>
          </NavLink>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center underline">
          Your Courses
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
                <Button>Update Course</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
