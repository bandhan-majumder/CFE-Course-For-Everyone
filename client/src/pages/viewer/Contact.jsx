import React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea"; 
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Handle form submission logic (e.g., send data to an API)
    console.log(data);
  };

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Get in Touch</h1>
      <p className="text-lg text-center mb-12">
        Feel free to leave any inquiries below or give us a call to speak with our helpful team.
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
        <h2 className="text-xl font-semibold">Contact Information</h2>
        <p>📍 Address: 123 Main St, Anytown, USA</p>
        <p>📞 Phone: (123) 456-7890</p>
        <p>✉️ Email: info@yourdomain.com</p>
      </footer>
    </div>
  );
};

export default Contact;