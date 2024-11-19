// src/pages/Home.jsx
import React, { useEffect } from "react";
import { CollapseView } from "../components/CollapseView";
import Card from "../components/Card";
import { CiCirclePlus } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigation = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggedIN")) {
      navigation("/");
    } else {
      navigation("/login");
    }
  }, []);
  return (
    <div className="container mx-auto p-4 w-full mt-40 min-h-fit flex flex-col items-center bg-white rounded-t-2xl pb-20">
      <h1 className="text-4xl font-bold text-center my-7">Welcome to Wolo</h1>
      <p className="text-center text-lg mb-8">
        Your ultimate e-learning platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          onClick={() => {
            navigation("/viewCourses");
          }}
          title="My Courses"
        >
          <GiOpenBook size={40} className="text-white font-bold" />
        </Card>
        <Card
          onClick={() => {
            navigation("/addCourse");
          }}
          title="Add a Course"
        >
          <FaPlusCircle size={40} className="text-white font-bold" />
        </Card>
      </div>
    </div>
  );
};

export default Home;
