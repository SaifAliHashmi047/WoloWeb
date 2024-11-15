import React, { useEffect, useState } from "react";
import { CollapseView } from "../components/CollapseView";

import { useNavigate, useParams } from "react-router-dom";
import { api } from "../Api/Enviornment";
import { callApi } from "../Api/CallAPI";
import { GiBookCover } from "react-icons/gi";
import { TiVideo } from "react-icons/ti";
import { BiSolidBookContent } from "react-icons/bi";
import { IoDocumentText } from "react-icons/io5";
import moment from "moment";
import ReactPlayer from "react-player";
import { Modal } from "../components/Modal";
import { FaFilePdf } from "react-icons/fa";
import colors from "../colors";
import LoadingModal from "../components/LoadingModal";

const CourseDetail = () => {
  const navigation = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [childrenUpdate, setChildrenUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [quizData, setQuizData] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userLoggedIN")) {
      callCoursesAPI();
    } else {
      navigation("/login");
    }
  }, []);

  const getSingleCourses = async () => {
    const endpoint = api?.oneCourse + courseId;
    console?.log("---------CourseSingle---------2>", endpoint);
    const response = await callApi(endpoint, "GET", null);
    return response;
  };

  const joinLink = (val) => {
    console?.log(val);
  };

  const callCoursesAPI = async () => {
    try {
      setIsLoading(true);
      const response = await getSingleCourses();
      if (response !== undefined) {
        if (response?.status === 201 || response?.status === 200) {
          console?.log(
            "---------CourseSingle--------->",
            response?.data?.course
          );
          setCourse(response?.data?.course);
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
  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto lg:mx-36 p-4 w-fit mt-10 min-h-fit flex flex-col items-center bg-white rounded-t-2xl pb-24">
          <img src={course?.image} className="w-full h-80 object-fit" />
          <h1 className="text-4xl font-bold text-center my-2">
            {course?.title}
          </h1>

          <div className="flex flex-col justify-center my-8  w-full space-y-4">
            <CollapseView className="" title={"Basic Details"}>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between my-2">
                  <p className=" w-1/2 font-bold">Name </p>
                  <p className=" w-1/2">{course?.title}</p>
                </div>
                <div className="flex flex-row justify-between my-2">
                  <p className=" w-1/2 font-bold">Tags </p>
                  <div className="w-1/2 flex gap-2 flex-wrap">
                    {course?.tags?.map((txt) => (
                      <p className=" bg-secondary text-wrap rounded-md px-2 text-white">
                        {" "}
                        {txt.toUpperCase()}
                      </p>
                    ))}
                  </div>
                  {/* <
                {" "}
                
              </p> */}
                </div>
                <div className="flex flex-row justify-between my-2">
                  <p className=" w-1/2 font-bold">Category </p>
                  <p className=" w-1/2">{course?.category?.name}</p>
                </div>
                <div className="flex flex-row justify-between my-2">
                  <p className=" w-1/2 font-bold"> Budget </p>
                  <p className=" w-1/2">{course?.price}</p>
                </div>
                <div className="flex flex-row justify-between my-2">
                  <p className=" w-1/2 font-bold"> Descriptipon </p>
                  <p className=" w-1/2">{course?.description}</p>
                </div>

                <div className="flex flex-row justify-between my-2 h-80">
                  <p className=" w-1/2 font-bold"> Image </p>
                  <img src={course?.image} className="w-1/2 h-64 object-fit" />
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <p className=" w-1/2 font-bold">Trailer </p>

                  <div className=" w-1/2 relative h-80">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls={true}
                      playsinline={true}
                      url={course?.trailer}
                    />
                  </div>
                </div>

                {/* <p className=" font-bold text-base text-primary my-2">
              This Course includes
            </p>
            <div className=" mx-3">
              <div className="flex flex-row space-x-2 align-middle">
                <TiVideo
                  size={22}
                  className=" text-primary font-bold"
                ></TiVideo>
                <p>{course?.totalModulesTime} videos</p>
              </div>

              <div className="flex flex-row space-x-2 align-middle">
                <BiSolidBookContent
                  size={22}
                  className=" text-primary font-bold"
                ></BiSolidBookContent>
                <p>{course?.totalModules} lessons</p>
              </div>

              <div className="flex flex-row space-x-2 align-middle">
                <IoDocumentText
                  size={22}
                  className=" text-primary font-bold"
                ></IoDocumentText>
                <p>{course?.totalResources} resources</p>
              </div>
            </div> */}
              </div>
            </CollapseView>
            <CollapseView
              className="h-auto"
              title={"Modules"}
              childrenUpdate={!childrenUpdate}
            >
              <div className="flex flex-col w-full">
                {course?.modules.map((item) => (
                  <div className=" py-2">
                    <p className=" font-bold text-xl text-primary my-2 justify-self-center self-center">
                      {item?.title}
                    </p>
                    {item?.lectures.map((item) => (
                      <div className=" my-8  w-full space-y-4  rounded-md">
                        <CollapseView
                          className=" bg-secondary "
                          title={item?.title}
                          notifyParent={(val) => {
                            console?.log("------------_-_--__-___-----_>"),
                              setChildrenUpdate(!val);
                          }}
                        >
                          <div className="flex flex-col w-full">
                            <div className="flex flex-row justify-between my-2">
                              <p className=" w-1/2 font-bold">Title </p>
                              <p className=" w-1/2">{item?.title}</p>
                            </div>
                            {item?.totalquiz ? (
                              <div>
                                <div className="flex flex-row justify-between my-2">
                                  <p className=" w-1/2 font-bold">
                                    No of Questions{" "}
                                  </p>
                                  <p className=" w-1/2">{item?.totalquiz}</p>
                                </div>
                                <div className="flex flex-row justify-between my-2">
                                  <p className=" w-1/2 font-bold">Quiz Time </p>
                                  <p className=" w-1/2">{item?.quizTime}</p>
                                </div>
                                <div className="flex flex-row justify-between my-2">
                                  <p className=" w-1/2 font-bold">Quiz </p>
                                  <div className="w-1/2 flex gap-2 flex-wrap">
                                    {item?.quiz?.map((txt) => (
                                      <p
                                        onClick={() => {
                                          setQuizData(txt);
                                          setOpenModal(true);
                                        }}
                                        className=" bg-secondary text-wrap rounded-md px-2 text-white"
                                      >
                                        {" "}
                                        {txt?.question} ?
                                      </p>
                                    ))}
                                  </div>
                                  {/* <
                {" "}
                
              </p> */}
                                </div>
                              </div>
                            ) : null}
                            <div className="flex flex-row justify-between mt-2 ">
                              <p className=" w-1/2 font-bold">Lecture Video </p>

                              <div className=" w-1/2 relative h-80">
                                <ReactPlayer
                                  width="100%"
                                  height="100%"
                                  controls={true}
                                  playsinline={true}
                                  url={item?.videourl}
                                />
                              </div>
                            </div>
                          </div>
                        </CollapseView>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CollapseView>
            <CollapseView className="" title={"Lives"}>
              <div className="flex flex-col w-full">
                {course?.sessions.map((item) => (
                  <div className=" py-2">
                    <p className=" font-bold text-base text-primary my-2 justify-self-center self-center">
                      {item?.title}
                    </p>
                    <div className=" flex justify-between ">
                      <div className="flex flex-col ">
                        <p>
                          {" "}
                          {moment(item?.starttime).format("dddd, DD MMMM YYYY")}
                        </p>
                        <p>
                          {moment(item?.starttime).format("hh:mm A") +
                            " - " +
                            moment(item?.endtime).format("hh:mm A")}
                        </p>
                      </div>

                      <div
                        onClick={() => joinLink(item?.link)}
                        className=" bg-secondary text-white px-6 py-2 rounded-lg mx-2 justify-center h-fit"
                      >
                        <a
                          className=" text-md font-bold"
                          href={item?.link}
                          target="_blank"
                        >
                          Join
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CollapseView>

            <CollapseView className="" title={"Resources"}>
              <div className="flex flex-col w-full">
                {course?.resources?.map((item) => (
                  <div className="flex flex-row justify-between py-2 items-center ">
                    <p className=" w-1/2 font-medium text-primary">
                      {" "}
                      {item?.title}
                    </p>

                    <a
                      className=" flex flex-col justify-center text-center items-center"
                      href={item?.document}
                      target="_blank"
                    >
                      <FaFilePdf color={colors?.primary} size={20} />
                      <p className="justify-center text-center text-xs my-2">
                        View File
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </CollapseView>
          </div>
          {openModal && (
            <Modal onClose={() => setOpenModal(false)}>
              <div className="flex flex-col w-full">
                <p className=" text-black  py-2 rounded-lg mx-2 text-lg self-start font-bold">
                  Q : {quizData?.question}
                </p>

                {quizData?.options?.map((txt) => (
                  <p className=" bg-secondary text-wrap rounded-md px-2 text-white my-2  text-center">
                    {" "}
                    {txt.toUpperCase()}
                  </p>
                ))}
              </div>
              <p className=" text-black  py-2 rounded-lg mx-2 text-md self-start font-bold mt-10">
                Correct Answer :
              </p>

              <p className=" bg-primary text-wrap rounded-md px-2 text-white py-2 font-bold text-center">
                {quizData?.correctAnswer.toUpperCase()}
              </p>
            </Modal>
          )}
        </div>
      ) : (
        <LoadingModal isLoading={isLoading} />
      )}
    </>
  );
};

export default CourseDetail;
