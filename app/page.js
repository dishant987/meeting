"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Users,
  Video,
  MessageSquare,
  Lock,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Easy Scheduling",
    description:
      "Quickly set up meetings with our intuitive calendar interface.",
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Time Zone Support",
    description:
      "Automatically adjust meeting times for participants in different time zones.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Group Meetings",
    description: "Schedule meetings with multiple participants effortlessly.",
  },
  {
    icon: <Video className="h-8 w-8 text-primary" />,
    title: "Video Integration",
    description:
      "Seamlessly integrate with popular video conferencing platforms.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    title: "Reminders & Notifications",
    description:
      "Send automated reminders to ensure participants don't forget their meetings.",
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Privacy Controls",
    description:
      "Set privacy levels for your meetings and control who can see your availability.",
  },
];

const words = [
  {
    text: "Simplify",
  },
  {
    text: "Your",
  },
  {
    text: "Scheduling",
  },
  
];

const page = () => {
  return (
    <main className="container mx-auto px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-14">
        <motion.div
          className="lg:w-1/2 mt-10"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold gradient-title mb-6">
            Simplify Your Scheduling
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Managing meetings and appointments doesn't have to be complicated.
            With our streamlined scheduling tool, you can easily organize your
            day, set up meetings, and coordinate with others in just a few
            clicks. Whether you're juggling multiple events or just trying to
            find the perfect time for a one-on-one, our intuitive interface
            makes it simple. Say goodbye to back-and-forth emails and calendar
            confusion schedule smarter, not harder. Start simplifying your
            scheduling today!
          </p>
        </motion.div>

        <motion.div
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full  max-w-lg aspect-square ">
            <Image
              className="rounded-2xl"
              src={"/meeting.png"}
              alt="meeting"
              priority={true}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </motion.div>
      </div>
      <section className=" bg-background pb-16 pt-0">
        <div className=" mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="transition-transform hover:scale-105">
                  <CardHeader className="flex flex-row items-center space-x-4">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <div>
        <Testimonials/>
      </div>
    </main>
  );
};

export default page;
