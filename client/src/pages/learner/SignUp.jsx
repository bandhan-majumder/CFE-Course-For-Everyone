import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
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

export default function SignIn() {

  const [formData, setFormData] = useState(null)
  const navigate = useNavigate();

  // handle the changes in input 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); 
  };

  // handle the submit button
  const handleSubmit = async (e) => {
    
    //   // firstly prevent the page from refreshing
    e.preventDefault();

    // clear the previous error/success messages

    // if the user submits without filling all the field, simply return and show user an error message

    console.log("Inside onclick event: ", formData)
      if (
        !formData || // if empty fields are submitted, then formData will be undefined. We can't do undefined.email
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password
      ) {
        return console.log("Please fill out all the fields");
      }

      // if all the data are provided, send it to backend 
      try {
        const response = await axios.post("/api/learner/signup", formData);

        if (response.data.success) {
          // clear the form or redirect the user
          setFormData(null)
          setTimeout(() => navigate("/learner/signin"), 2000);
        } else {
          alert(response.data.message || "Internal server error");
        }
      } catch (error) {
        console.log(error)
        if (error.response) {
          alert(
            // alert with the first error occuring
            error.response.data.error.issues[0].message ||
              "An error occurred during signup. Try with different mail"
          );
        } else if (error.request) {
          alert("No response from server. Please check your internet connection.")
        } else {
          alert("An error occurred while sending the request");
        }
      
      }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create your learner's account
          </CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstName" type="text" placeholder="John" onChangeCapture={handleChange}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastName" type="text" placeholder="Wick" onChangeCapture={handleChange}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" onChangeCapture={handleChange}/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="**************" onChangeCapture={handleChange}/>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit' className="w-full rounded-full" onClick={handleSubmit}>Sign Up</Button>
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
          <Button variant="outline" className="w-full bg-red-600 text-white rounded-full">
            <AiFillGoogleCircle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/learner/signin" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
