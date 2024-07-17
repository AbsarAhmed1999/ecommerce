import React from "react";
import "@/app/globals.css";

export default function AboutUs() {
  return (
    <div className="flex flex-col custom-flex-md custom-flex-lg justify-between items-center p-6  bg-gray-300 mt-3">
      <div className="flex-1 flex flex-col justify-center items-start p-6 ">
        <h1 className="text-5xl font-bold mb-8">Our Story</h1>
        <hr className="border-t-4 border-black w-52 ml-0 mb-8" />
        <p className="font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          similique expedita fuga voluptas sapiente nemo a iure consectetur
          consequatur, eum natus voluptatibus temporibus sint distinctio alias
          cupiditate reiciendis aspernatur quas. Lorem, ipsum dolor sit amet
          consectetur adipisicing elit. Beatae perferendis itaque dolorum
          officiis. At suscipit et, accusantium sint earum molestias laborum
          ducimus alias qui mollitia eum dolores aliquid accusamus quod.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-96 md:w-[400px] ">
          <img
            src="/product4.jpg"
            alt="Product"
            className="object-contain mix-blend-darken custom-width-md"
          />
        </div>
      </div>
    </div>
  );
}
