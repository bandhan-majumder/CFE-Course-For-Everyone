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
import Spinner from "@/components/ui/spinner";

export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses when the component mounts
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

  // Render loading state
  if (loading) {
    return (
      <div className="text-center text-4xl">
        <Spinner size="large" className="from-white to-green-600 my-5" />
        <p className="my-5">Loading courses...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center underline">
          All Available Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseData.map((course, index) => (
            <Card key={index}>
              <CardHeader>
                <img src={course.imageUrl} alt={course.title} />
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>Price: {course.price}</CardContent>
              <CardFooter>
                <Button>Enroll Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
