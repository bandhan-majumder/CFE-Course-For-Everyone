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
import CreatorOAuth from "@/components/CreatorOAuth";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-[800px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create your creator's account
          </CardTitle>
          <CardDescription>Enter your details below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" type="text" placeholder="John" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" type="text" placeholder="Wick" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="**************" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full rounded-full">Sign in</Button>
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
          <CreatorOAuth />
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/creator/signin" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
