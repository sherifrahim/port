import React from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Experience from "../components/home/Experience";
import Projects from "../components/home/Projects";
import Contact from "../components/home/Contact";
import { Toaster } from "@/components/ui/sonner";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}