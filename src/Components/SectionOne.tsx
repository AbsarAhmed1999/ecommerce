import React from "react";
import "@/app/globals.css";
export default function SectionOne() {
  return (
    <div className="flex flex-col md:flex-column lg:flex-row justify-between items-center p-6 md:p-11 bg-gray-800">
      <div className="flex-1 flex flex-col justify-center items-start text-white p-6 md:p-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, facere
          consequuntur. Sapiente aliquam qui amet similique commodi culpa
          laborum voluptatibus sed, eos tempora necessitatibus, omnis aliquid
          nostrum necessitatibus, omnis aliquid nostrum pariatur, odio Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Velit, facere
          consequuntur. Sapiente aliquam qui amet similique commodi culpa
          laborum voluptatibus sed, eos tempora necessitatibus, omnis aliquid
          nostrum pariatur, odioLorem ipsum dolor sit amet consectetur
          adipisicing elit. Velit, facere consequuntur. Sapiente aliquam qui
          amet similique commodi culpa laborum voluptatibus sed, eos tempora
          necessitatibus, omnis aliquid nostrum pariatur, odio
        </p>
      </div>
      <div className="flex-1 flex justify-center items-center  md:p-10">
        <div className="w-full sm:w-[400px]">
          <img src="/product.jpg" alt="Product" className="object-contain" />
        </div>
      </div>
    </div>
  );
}
