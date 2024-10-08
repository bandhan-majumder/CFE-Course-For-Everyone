import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "@/components/ui/spinner";
import { NavLink } from "react-router-dom";

export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLearner = useSelector((state) => state.learner.currentLearner);
 
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
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center underline mt-3">
        All Available Courses
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {courseData.map((course) => (
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
              <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
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
        ))}
      </div>
    </div>
  );
}
