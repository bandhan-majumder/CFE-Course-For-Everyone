import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardButton from "@/components/DashboardButton";
import JoinAsOption from "@/components/JoinAsOption";

const LandingPage = () => {
  const [courseData, setCourseData] = useState([]);
  const currentLearner = useSelector((state) => state.learner.currentLearner);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [boughtCourses, setBoughtCourses] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await axios.get("/api/course/preview");
        if (response.data && response.data.courses) {
          setCourseData(response.data.courses);
        } else {
          throw new Error("No courses found.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    }
    getAllCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" className="from-white to-green-600" />
        <p className="ml-4 text-xl">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Course For Everyone
        </h1>
        <p className="text-xl mb-8">
          Here we bring contents "For everyone by experts"
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <NavLink to="/courses">
            <Button size="lg">Browse Courses</Button>
          </NavLink>
          <DashboardButton />
          <JoinAsOption />
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center underline">
          Featured Courses
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {courseData.map(
            (course, index) =>
              // render only first 4 courses in the db
              index < 4 && (
                <Card
                  key={course._id}
                  className="flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] max-w-[400px]"
                >
                  <CardHeader className="flex-grow">
                    <div className="aspect-video mb-4">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <CardTitle className="text-xl mb-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-lg font-semibold">
                    Price: ${course.price}
                  </CardContent>
                  <CardFooter>
                    {currentLearner ? (
                      <NavLink
                        to={`/course/payment?c_id=${course._id}`}
                        className="w-full"
                      >
                        <Button className="w-full">Enroll now</Button>
                      </NavLink>
                    ) : (
                      <NavLink to={"/learner/signin"} className="w-full">
                        <Button className="w-full">Enroll now</Button>
                      </NavLink>
                    )}
                  </CardFooter>
                </Card>
              )
          )}
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
            {
              name: "Misan Kalip",
              text: "Best investment ever done...",
            },
            {
              name: "Sai",
              text: "I have never been transformed so much before...",
            },
          ].map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.name}`}
                    />
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
