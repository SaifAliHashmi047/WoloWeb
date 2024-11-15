import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { FaPlusCircle } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/Enviornment";
import { callApi } from "../Api/CallAPI";
import CourseCard from "../components/CourseCard";
import LoadingModal from "../components/LoadingModal";
import { BiSearchAlt } from "react-icons/bi";
import colors from "../colors";

const ViewCourse = () => {
  const navigation = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]); // To store filtered courses
  const [searchText, setSearchText] = useState(""); // To store search text
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userLoggedIN")) {
      callCoursesAPI();
    } else {
      navigation("/login");
    }
  }, []);

  const getCourses = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const endpoint = api?.getMyCourses + user?._id;
    const response = await callApi(endpoint, "GET", null);
    return response;
  };

  const callCoursesAPI = async () => {
    try {
      setIsLoading(true);
      const response = await getCourses();
      if (response !== undefined) {
        if (response?.status === 201 || response?.status === 200) {
          setCourses(response?.data?.record);
          setFilteredCourses(response?.data?.record); // Set filteredCourses initially
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search text change
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    // Filter courses
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="container mx-auto p-4 w-full mt-40 min-h-screen flex flex-col items-center bg-white rounded-t-2xl pb-24 ">
      <h1 className="text-4xl font-bold text-center my-8">My Courses</h1>

      {/* Search Bar */}
      <div className="mb-8 w-full flex flex-col justify-center md:justify-between px-5">
        <div className="border rounded-md justify-between items-center md:w-80 overflow-hidden flex flex-row">
          <input
            type="text"
            className=" p-2 focus:outline-none flex-1"
            placeholder="Search courses..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <BiSearchAlt className="mx-4" size={20} color={colors?.primary} />
        </div>

        <p className="text-md text-primary  py-2 font-bold justify-center my-4 md:my-0">
          {filteredCourses?.length > 0
            ? filteredCourses?.length + " Courses"
            : "No record found"}
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-4">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            onClick={() => navigation(`/course/${course.id}`)}
            title={course.title}
          >
            <img src={course?.image} className="w-full h-36 object-fit" />
          </CourseCard>
        ))}
      </div>
      <LoadingModal isLoading={isLoading} />
    </div>
  );
};

export default ViewCourse;
