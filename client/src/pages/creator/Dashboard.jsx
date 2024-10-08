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
import { useDispatch } from "react-redux";
import { logoutCreator } from "@/features/creator/creatorSlice";

const Dashboard = () => {
  const [courseData, setCourseData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await axios.get("/api/creator/course/bulk");
        console.log("r", response);
        if (response.data && response.data.allCourses.length > 0) {
          setCourseData(response.data.allCourses);
        }
      } catch (error) {
        console.log("e", error);
        if (error.status === 403) {
          alert("You are not signed in as admin");
          navigate("/creator/signin");
        } else {
          alert("Error fetching courses...");
        }
      }
    }
    getAllCourses();
  }, []);

  async function logoutFunc() {
    const response = await axios.post("/api/creator/logout");
    dispatch(logoutCreator());
    if (response.data.success) {
      navigate("/");
    }
  }

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
          <NavLink to="/creator/create/course">
            <Button size="lg">Create course</Button>
          </NavLink>
          <Button size="lg" className="bg-red-600" onClick={logoutFunc}>
            Log out
          </Button>
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
                  <NavLink to={`/creator/update/course?c_id=${course._id}`}>
                    <Button>Update Course</Button>
                  </NavLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <div className="py-2">Your have not created any courses yet.</div>
            <div>
              <NavLink to="/creator/create/course">
                <Button size="lg">Create your first course</Button>
              </NavLink>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
