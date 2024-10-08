import React from "react";
import Header from "../components/header";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="w-[60%] mx-auto my-16 text-center">
        <h1 className="text-primary text-5xl font-bold">
          Build Your Resume with AI
        </h1>

        <p className="my-5 text-lg text-gray-700 font-semibold">
          Here you can create your resume with maintaining professionalism.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button>
            Get Started <ArrowRight />
          </Button>
          <Button>
            Show GitHub Codes <GithubIcon />
          </Button>
        </div>

        {/* Social Links */}
        <div className="mt-12">
          <h3 className="mt-5 text-xl text-gray-700 font-semibold">
            Connect With Me
          </h3>
          {/* LinkedIn */}
          <div className="flex items-center justify-center gap-5 mt-3">
            <Link>
              <LinkedinIcon />
            </Link>

            <Link>
              <TwitterIcon />
            </Link>

            <Link>
              <GithubIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
