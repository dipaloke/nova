import { Spinner } from "@/components/global/loader/spinner";
import React from "react";

const AuthLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Spinner  />
    </div>
  );
};

export default AuthLoading;
