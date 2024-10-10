import React from "react";
import { LoaderCircle } from "lucide-react";

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <LoaderCircle className="animate-spin mr-1" />
    <img src="/logo.svg" alt="Loading..." width="100" height="100" />
  </div>
);

export default Loader;
