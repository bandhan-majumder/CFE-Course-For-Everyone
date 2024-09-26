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
import Spinner from "@/components/ui/spinner";
import {
  signInStart,
  singInSuccess,
  singInFailure,
} from "@/features/learner/learnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignIn() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(
    (state) => state.learner
  );

  console.log(loading);
  // handle the changes in input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    //   // firstly prevent the page from refreshing
    e.preventDefault();

    if (!formData || !formData.email || !formData.firstName || !formData.lastName || !formData.password) {
      alert("Please fill out all the fields");
      return;
    }

    try {
      dispatch(signInStart()); // set loading true, set error null
      const response = await axios.post("/api/learner/signup", formData);

      if (response.data.success) {
        // redirect the learner
        dispatch(singInSuccess(response.data));
        setTimeout(() => navigate("/learner/dashboard"), 1200);
      } else {
        dispatch(
          singInFailure(response.data.message || "Internal server error")
        );
      }
    } catch (error) {
        dispatch(singInFailure("Password must contain one uppercase, lowercase, special character, opening bracket, closing bracket, '/', '', '?' and two digits"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create your learner's account
          </CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Roman"
              onChangeCapture={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Reings"
              onChangeCapture={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="roman@example.com"
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
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full rounded-full bg-black"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="small" className="from-white to-green-600" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              "Sign up"
            )}
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
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
