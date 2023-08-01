import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Display from "../components/Elements/display"
import Header from "../components/Sections/Header";
import Services from "../components/Sections/Services";
import Projects from "../components/Sections/Projects";
import Blog from "../components/Sections/Blog";
import Pricing from "../components/Sections/Pricing";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Display />
      <Services />
      <Projects />
      <Blog />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}


