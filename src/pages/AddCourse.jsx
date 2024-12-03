import React, { useEffect, useState } from "react";
import { CollapseView } from "../components/CollapseView";

import { useNavigate } from "react-router-dom";
import { api } from "../Api/Enviornment";
import { callApi } from "../Api/CallAPI";
import LoadingModal from "../components/LoadingModal";
import AddMudulesCollapse from "../components/AddMudulesCollapse";
import AddResources from "../components/AddResources";
import AddSessions from "../components/AddSessions";
import AddAvalibility from "../components/AddAvalibility";
import FlashMessage from "../components/FlashMessage";
const youtubeRegex =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

const AddCourse = () => {
  const navigation = useNavigate();
  const [course, setCourse] = useState({
    courses: null,
    modules: [],
    sessions: [],
    resources: [],
    agoraSessions: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [courseData, setCourseData] = useState({
    title: "",
    image: "",
    category: {
      preference: "",
      name: "",
    },
    tags: [],
    description: "",
    trailer: "",
    price: 0,
    status: "pending",
  });
  const [categoryData, setCategoryData] = useState([]);
  const [resources, setResources] = useState();
  const [modules, setModules] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [flash, setFlash] = useState({ message: "", type: "" });

  useEffect(() => {
    if (localStorage.getItem("userLoggedIN")) {
      //   callCoursesAPI();
    } else {
      navigation("/login");
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, []);

  const getAllPreference = async () => {
    const response = await callApi(api?.preference, "GET");
    return response;
  };
  const getCategory = async () => {
    try {
      const response = await getAllPreference();
      if (response !== undefined) {
        if (response?.status === 201 || response?.status === 200) {
          if (response?.success) {
            setCategoryData(response?.data?.data);
            console?.log("------------____------_>", response?.data?.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (e, field) => {
    const file = e.target.files[0];
    console?.log("---------DXata-------->", file);
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDoc = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResources((prev) => ({
          ...prev,
          doc: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteImage = () => {
    setCourseData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const validateCoursedata = async () => {
    if (courseData.title.length < 2) {
      // alert("Please enter a valid course title");
      setFlash({ message: "Please enter a valid course title", type: "error" });
      return;
    }
    if (courseData.tags?.length < 1) {
      // alert("Please enter a valid course title");
      setFlash({ message: "Please enter a valid course title", type: "error" });
      return;
    }
    if (courseData.category?.name?.length < 2) {
      // alert("Please select a valid course category");
      setFlash({
        message: "Please select a valid course category",
        type: "error",
      });
      return;
    }
    if (courseData.price < 0) {
      // alert("Please enter a valid price");
      setFlash({ message: "Please enter a valid price", type: "error" });
      return;
    }
    if (courseData.description?.length < 2) {
      // alert("Please enter a valid course description");
      setFlash({
        message: "Please enter a valid course description",
        type: "error",
      });
      return;
    }
    if (courseData.image?.length < 2) {
      // alert("Please enter a valid course image");
      setFlash({ message: "Please enter a valid course image", type: "error" });
      return;
    }
    if (courseData.trailer?.length < 2) {
      // alert("Please enter a valid course trailer");
      setFlash({
        message: "Please enter a valid course trailer",
        type: "error",
      });
      return;
    }
    if (youtubeRegex.test(courseData.trailer) === false) {
      // alert("Please enter a valid Youtube link for course trailer");
      setFlash({
        message: "Please enter a valid Youtube link for course trailer",
        type: "error",
      });
      return;
    }
    const url = await fileUploadUrl(imageFile);
    const imageUrl = url?.url;
    setIsLoading(false);
    console?.log("------------------>", imageUrl);
    setCourseData((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    setFlash({
      message: "Course Basic Details Saved successfully!",
      type: "success",
    });
    setCourse((prev) => ({
      ...prev,
      courses: courseData,
    }));
  };

  const fileUploadUrl = async (file) => {
    setIsLoading(true);
    const file1 = { file };
    const response = await callApi(api?.fileUpload, "POST", file1, true);
    console?.log("---------------->", file1);
    return response;
  };
  const handleCloseFlashMessage = () => {
    setFlash({ message: "", type: "" });
  };

  const handleCourseAdd = async () => {
    setIsLoading(true);
    if (course?.courses == null) {
      setFlash({
        message: "Please save course basic details to proceed ",
        type: "error",
      });
      setIsLoading(false);
      return false;
    }
    if (course?.modules.length < 1) {
      setFlash({
        message: "Please save course modules to proceed ",
        type: "error",
      });
      setIsLoading(false);
      return false;
    }
    if (course?.agoraSessions == null) {
      setFlash({
        message: "Please save your availability to proceed ",
        type: "error",
      });
      setIsLoading(false);
      return false;
    }

    const response = await callSaveCourseAPI();
    console.log("Resposeee => ", response);
    setIsLoading(false);
    if (response !== undefined) {
      if (response?.status === 201 || response?.status === 200) {
        if (response?.success) {
          setFlash({
            message: "Course created successfully",
            type: "success",
          });
          navigation(-1);
        }
      } else {
        setFlash({
          message: "Session expired please login again",
          type: "error",
        });
      }
    }
  };

  const callSaveCourseAPI = async () => {
    const createCourseData = {
      courses: course?.courses,
      modules: course?.modules,
      resources: course?.resources ? course?.resources : [],
      sessions: course?.sessions ? course?.sessions : [],
      agoraSession: course?.agoraSessions ? course?.agoraSessions : {},
    };
    console.log(
      "Create Body 1234212343232123 => ",
      JSON?.stringify(createCourseData, " ", 2)
    );
    const response = await callApi(api?.createCourse, "POST", createCourseData);
    return response;
  };

  return (
    <>
      <div className="container  lg:mx-36 p-4  mt-10 min-h-fit flex flex-col items-center bg-white rounded-t-2xl pb-24">
        <h1 className="text-4xl font-bold text-center my-2">
          Add Course Details
        </h1>

        {/* <FlashMessage message={flash.message} type={flash.type} /> */}

        <div className="flex flex-col justify-center my-8  w-full space-y-4">
          <CollapseView className="" title={"Basic Details"}>
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between my-2">
                <p className=" w-1/2 font-bold">Name </p>
                <input
                  type="text"
                  className="w-1/2 focus:outline-none border-b-[1px] px-2"
                  value={courseData?.title}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Course Name"
                />
              </div>
              <div className="flex flex-row justify-between my-2">
                <p className="w-1/2 font-bold">Tags</p>
                <div className="w-1/2 flex gap-2 flex-wrap items-center">
                  <textarea
                    className="px-2 w-full border focus:outline-none"
                    value={courseData?.tagInput || ""}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        tagInput: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === ",") {
                        e.preventDefault();
                        if (courseData.tagInput?.trim()) {
                          setCourseData((prev) => ({
                            ...prev,
                            tags: [...(prev.tags || []), prev.tagInput.trim()],
                            tagInput: "",
                          }));
                        }
                      }
                    }}
                    placeholder="Type a tag (Comma seperated)"
                  />
                  <div className=" flex flex-row overflow-x-scroll">
                    {courseData?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="  bg-secondary  text-white px-2 py-1 rounded-md flex items-center gap-2 cursor-pointer mx-2"
                      >
                        {tag}
                        <span
                          onClick={() =>
                            setCourseData((prev) => ({
                              ...prev,
                              tags: prev.tags.filter((_, i) => i !== index),
                            }))
                          }
                          className="font-bold m-x-1"
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between my-2">
                <p className=" w-1/2 font-bold">Category </p>
                <select
                  className="w-1/2 focus:outline-none border-b-[1px] bg-transparent"
                  value={courseData?.category?.name || ""}
                  onChange={(e) => {
                    const selectedCategory = categoryData.find(
                      (category) => category.title === e.target.value
                    );

                    if (selectedCategory) {
                      setCourseData((prev) => ({
                        ...prev,
                        category: {
                          preference: selectedCategory._id,
                          name: selectedCategory.title,
                        },
                      }));
                    }
                  }}
                >
                  {/* Default Option */}
                  <option value="" disabled>
                    Select a Category
                  </option>

                  {/* Map Over Category Data */}

                  {categoryData?.map((category) => (
                    <option key={category.id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row justify-between my-2">
                <p className=" w-1/2 font-bold"> Budget </p>
                <input
                  type="number"
                  className="w-1/2 focus:outline-none border-b-[1px] px-2"
                  value={courseData?.price}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  placeholder="Price"
                />
              </div>
              <div className="flex flex-row justify-between my-2 ">
                <p className="w-1/2 font-bold">Description</p>
                <textarea
                  className="w-1/2 focus:outline-none p-2 resize-none border-b-[1px]"
                  rows={4} // Ensures it is 4 lines tall
                  value={courseData?.description}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Course Description"
                ></textarea>
              </div>

              <div className="flex flex-row justify-between my-2 h-72 ">
                <p className=" w-1/2 font-bold"> Image </p>
                {courseData.image ? (
                  <div className="relative w-full sm:w-1/2 ">
                    <img
                      src={courseData.image}
                      alt="Course"
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleDeleteImage("image")}
                      className="absolute top-2 right-2 text-white px-2 py-1 rounded-md bg-red"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "image")}
                    className="w-full sm:w-1/2 border border-gray-300 rounded-md p-2 h-64"
                  />
                )}
              </div>
              <div className="flex flex-row justify-between mt-2 ">
                <p className=" w-1/2 font-bold">Trailer </p>

                <input
                  type="text"
                  className="w-1/2 focus:outline-none border-b-[1px] px-2"
                  value={courseData?.trailer}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      trailer: e.target.value,
                    }))
                  }
                  placeholder="Enter your Youtube video link"
                />
              </div>
            </div>
            <div className="flex justify-end my-6">
              <button
                onClick={() => validateCoursedata()}
                className="text-white px-4 py-2 bg-green-500 rounded-md bg-primary"
              >
                Save
              </button>
            </div>
          </CollapseView>

          <AddMudulesCollapse
            setCourse={(mod) =>
              setCourse((prev) => ({
                ...prev,
                modules: mod,
              }))
            }
            onError={(msg) => {
              setFlash({
                message: msg,
                type: "error",
              });
            }}
            onSuccess={(msg) => {
              setFlash({
                message: msg,
                type: "success",
              });
            }}
          />

          <AddResources
            setCourse={(mod) =>
              setCourse((prev) => ({
                ...prev,
                resources: mod,
              }))
            }
            onError={(msg) => {
              setFlash({
                message: msg,
                type: "error",
              });
            }}
            onSuccess={(msg) => {
              setFlash({
                message: msg,
                type: "success",
              });
            }}
          />

          <AddSessions
            setCourse={(mod) =>
              setCourse((prev) => ({
                ...prev,
                sessions: mod,
              }))
            }
            onError={(msg) => {
              setFlash({
                message: msg,
                type: "error",
              });
            }}
            onSuccess={(msg) => {
              setFlash({
                message: msg,
                type: "success",
              });
            }}
          />
          <AddAvalibility
            setAgora={(val) => {
              setCourse((prev) => ({
                ...prev,
                agoraSessions: val,
              }));

              console?.log("------------->", course);
            }}
            onError={(msg) => {
              setFlash({
                message: msg,
                type: "error",
              });
            }}
            onSuccess={(msg) => {
              setFlash({
                message: msg,
                type: "success",
              });
            }}
          />
        </div>
        <div
          onClick={() => handleCourseAdd()}
          className=" bg-secondary  rounded-md"
        >
          <p className=" text-white font-bold text-xl my-4 mx-8">Add Course</p>
        </div>
      </div>

      <LoadingModal isLoading={isLoading} />

      {flash.message && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={handleCloseFlashMessage}
        />
      )}
    </>
  );
};

export default AddCourse;
