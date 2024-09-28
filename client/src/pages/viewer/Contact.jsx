import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea"; 
import { useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert("Message sent!")
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
      <p className="text-lg text-center mb-12">
        Feel free to leave any inquiries below.
      </p>

      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white p-8 rounded shadow-md">
          <div className="mb-4">
            <Input
              {...register("name")}
              placeholder="Your Name"
              className="border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <Input
              {...register("email")}
              placeholder="Your Email"
              type="email"
              className="border border-gray-300"
            />
          </div>

          <div className="mb-4">
            <Textarea
              {...register("message")}
              placeholder="Your Message"
              rows={4}
              className="border border-gray-300"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
            Send Message
          </Button>
        </form>
      </div>

      <footer className="mt-16 text-center">
      <div className="flex justify-center space-x-4 py-4">
      <NavLink to='https://github.com/bandhan-majumder/CFE-Course-For-Everyone' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiFillGithub className="h-10 w-10 mr-2" />
      </NavLink>
      <NavLink to='https://x.com/@MEbandhan' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiOutlineTwitter className="h-10 w-10 mr-2" />
      </NavLink>
      <NavLink to='https://www.linkedin.com/in/bandhan-majumder-5a10a1248/' className="flex items-center bg-gray-800 text-white rounded-lg p-2 hover:bg-gray-700 transition">
        <AiFillLinkedin className="h-10 w-10 mr-2" />
      </NavLink>
    </div>
      </footer>
    </div>
  );
};

export default Contact;