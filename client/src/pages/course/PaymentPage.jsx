import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const navigate = useNavigate();
  const [courseId, setCourseId] = useState(null);

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const cId = urlParams.searchParams.get("c_id");
    if (cId) {
      setCourseId(cId);
    } else {
      console.error("No course ID found in URL");
      // Handle the case where there's no course ID
    }
  }, []);

  // const purchaseCourse = async (courseId) => {
  //   try {
  //     console.log(courseId);
  //     const response = await axios.post("/api/course/purchase", {
  //       courseId: courseId,
  //     });
  //     if (response.data.success) {
  //       navigate("/");
  //     } else {
  //       alert("Error happened");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     navigate("/learner/signin");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to purchase course:", courseId);
      const response = await axios.post("/api/course/purchase", {
        courseId: courseId,
      });
      console.log("Purchase response:", response.data);
      if (response.data.success) {
        navigate("/learner/dashboard");
      } else {
        alert("Error: " + (response.data.message || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("Purchase error:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        navigate("/learner/signin");
      } else {
        alert("Error: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center py-4">
        <h1>
          Dummy payment section. Click on "Pay Now". Logic will be added later.
        </h1>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          <CardDescription>
            Enter your payment information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name on Card</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="bhutan">Bhutan</SelectItem>
                    <SelectItem value="nepal">Nepal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
