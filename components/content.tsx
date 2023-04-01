import React from "react";
import Image from "next/image";

const Content = () => (
    <section className="hidden lg:flex flex-col items-center justify-center lg:w-9/12 h-full ">
      <div className="relative w-40 h-40 opacity-50">
        <Image src={"/images/search-file.png"} alt={"icon"} layout="fill"  className="relative"/>
      </div>
      <div className="block w-full text-gray-500 text-xl text-center">Explore between your file and folders</div>
    </section>
)
export default Content