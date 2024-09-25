import { Button } from "@/components/ui/button";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
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

export default function SignIn() {
  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className="w-full max-w-[800px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in to your creator's account</CardTitle>
          <CardDescription>
            Enter your email and password below
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="**************" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in</Button>
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
          <Button variant="outline" className="w-full bg-red-600 text-white">
            <AiFillGoogleCircle className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/creator/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}