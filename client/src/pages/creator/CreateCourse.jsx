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
import {Textarea} from "@/components/ui/textarea"; 
import { useState, useEffect } from "react";
import axios from "axios";


export default function CreateCourse() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData || !formData.title || !formData.description || !formData.imageUrl || !formData.price) {
        alert("All the fields are required")
      return;
    }

    try {
      const response = await axios.post("/api/creator/create/course", formData);
      if(response.data.success){
        alert("Course created successfully")
        navigate("/creator/dashboard")
      } 
    } catch (error) {
      navigate('/creator/signin')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
      <CardTitle className="text-2xl text-center mt-3">Create a new course</CardTitle>
      <CardDescription className="text-center mt-1">Enter your course details</CardDescription>
        <CardHeader className="space-y-1">
        <img src="https://images.unsplash.com/photo-1522204538344-922f76ecc041?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Course Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Docker Course"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
            id="description"
              placeholder="This course will teach you Docker networking and ...."
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
              placeholder="20 (in $ only)"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label>Banner Image Url</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://mycourseimage/myimage/course/docker/asdfrwefcxv34234wrtdg"
              onChange={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-full bg-black"
            onClick={handleSubmit}
          >
        Create
          </Button>
        </CardFooter>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}