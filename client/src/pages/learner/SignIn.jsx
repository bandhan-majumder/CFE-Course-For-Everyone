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
import { useState } from "react";
import axios from "axios";
import LearnerOAuth from "@/components/LearnerOAuth";

export default function SignIn() {
  const [formData, setFormData] = useState(null);
  console.log(formData);
  const navigate = useNavigate();

  // handle the changes in input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    //   // firstly prevent the page from refreshing
    e.preventDefault();

    if (!formData || !formData.email || !formData.password) {
      alert("Please fill out all the fields");
      return;
    }

    try {
      const response = await axios.post("/api/learner/signin", formData);
      setFormData(null); // clear the form

      if (response.data.success) {
        // redirect the learner
        setTimeout(() => navigate("/learner/dashboard"), 2000);
      } else {
        alert(response.data.message || "Internal server error");
      }
    } catch (error) {
      if (error.response.data.message) {
        alert(error.response.data.message);
        navigate("/learner/signup");
      } else {
        alert("Error in signing up! Please try again later");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Sign in to your learner's account
          </CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChangeCapture={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="**************"
              onChangeCapture={handleChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full rounded-full" onClick={handleSubmit}>
            Sign in
          </Button>
        </CardFooter>
        <CardContent className="grid gap-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <LearnerOAuth />
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/learner/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
