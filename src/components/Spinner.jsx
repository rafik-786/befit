import { Spin } from "antd";
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed flex justify-center items-center inset-0 z-50  ">
      <div className="bg-black w-screen h-screen opacity-10"></div>
      <Spin size="large" className="z-10 fixed text-green-500 " />
    </div>
  );
};

export default Spinner;
