import React from "react";
import Nav from './component/Nav';  
import Hero from './component/Hero'; 
import Cta  from './component/Cta'; 
//import Hero from './component/Hero'; 
import About from "./component/About";
import  Teams  from "./component/Teams";
import  WhyJoinus from "./component/Whyjoinus";
import Testimonial  from "./component/Testimonial";
import Footer from "./component/Footer";



export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <h1 style={{ color: "#000" }}>Home Page</h1>
      <Nav />
       <Hero />
       <div>
         <About />
         </div>
         <div>
            <Teams/>
         </div>
         <div>
            <WhyJoinus/>
         </div>
         <div>
            <Testimonial/>
         </div>

      <Cta /> 
      <Footer/>
    </div>
  );
}
