import React from "react";
import Slider from "./_components/Slider";
import Products from "./products/page";
import FeaturedCPU from "./_components/FeaturedCpu";
export default function Home() {
  return (
    <div>
      <Slider />
      <Products />
    </div>
  );
}
