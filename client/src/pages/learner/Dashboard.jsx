import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [courseData, setCourseData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await axios.get("/api/learner/purchases");
        if (response.data.courseData) {
          setCourseData(response.data.courseData);
        }
      } catch (error) {
        console.log(error)
        if (error.status === 403) {
          alert("You are not signed in as learner");
          navigate("/learner/signin");
        } else {
          alert("Error fetching courses...");
        }
      }
    }
    getAllCourses();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Thanks for joining us as Learner
        </h1>
        <p className="text-xl mb-8">
          Here we bring contents "For everyone by experts"
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <NavLink to="/courses">
            <Button size="lg">
              Buy Courses
            </Button>
          </NavLink>
          <NavLink to="/learner/signup">
            <Button size="lg" className='bg-red-600'>
              Log out
            </Button>
          </NavLink>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center underline">
          Your Courses
        </h2>
        {courseData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courseData.map((course, index) => (
              <Card key={index}>
                <CardHeader>
                  <img src={course.imageUrl} alt="" />
                  <CardTitle className="sm:text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Price: ${course.price}</p>
                </CardContent>
                <CardFooter>
                  <NavLink to="https://youtu.be/dQw4w9WgXcQ?si=o4X4D5SagFfnVAhx">
                    <Button>Start Now</Button>
                  </NavLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="py-2">Your have not bought any courses yet.</div>
            <div>
              <NavLink to="/courses">
                <Button size="lg">Buy your first course</Button>
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
