import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import axios from "axios";

export default function updateCourse() {
  const urlParams = new URL(window.location.href);
  const courseId = urlParams.searchParams.get("c_id");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({courseId: courseId});
  console.log(formData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // not all the fields are required for update
    try {
      const response = await axios.put("/api/creator/update/course", formData);
      if (response.data.success) {
        alert("Course updated successfully");
        navigate("/creator/dashboard");
      } 
    } catch (error) {
      alert("You are not authorized to update the course")
      navigate("/creator/signin");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
        <CardTitle className="text-2xl text-center mt-3">
          Update your course
        </CardTitle>
        <CardDescription className="text-center mt-1">
          Enter your course details
        </CardDescription>
        <CardHeader className="space-y-1">
          <img
            src="https://plus.unsplash.com/premium_photo-1720430157140-6bb920f831b9?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Course Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Docker updated Course"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              id="description"
              placeholder="This updated course will teach you Docker networking and ...."
              rows={4}
              className="border border-gray-300"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="40 (in $ only)"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Banner Image Url</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://updatedcourse.com/waG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-full bg-black"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </CardFooter>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
