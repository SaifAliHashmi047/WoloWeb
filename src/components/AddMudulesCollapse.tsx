import React, { useState } from "react";
import { CollapseView } from "./CollapseView";
import AddQuizModal from "./AddQuizModal";
let videoRegex = /^https?:\/\/.*\.mp4$/;

const AddMudulesCollapse = ({ setCourse, onError, onSuccess }) => {
  const [childrenUpdate, setChildrenUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [quizData, setQuizData] = useState("");
  const [modules, setModules] = useState<any>([]);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLectureIndex, setSelectedLectureIndex] = useState(0);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const openQuizModal = (lecture, index, moduleIndex) => {
    setCurrentLecture(lecture);
    setSelectedLectureIndex(index);
    setSelectedModuleIndex(moduleIndex);
    setModalOpen(true);
  };

  const saveQuiz = (quizData) => {
    setModules((prev) => {
      const updatedModules = [...prev];
      const updatedLectures = [...updatedModules[selectedModuleIndex].lectures];

      if (!updatedLectures[selectedLectureIndex].quizes) {
        updatedLectures[selectedLectureIndex].quizes = quizData?.questions;
        updatedLectures[selectedLectureIndex].quizTime = quizData?.quizTime;
      }

      updatedModules[selectedModuleIndex].lectures = updatedLectures;
      return updatedModules;
    });
    setCourse(modules);
    setCurrentLecture(null);
  };

  const addModule = () => {
    setChildrenUpdate(!childrenUpdate);
    setModules((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: "",
        lectures: [],
      },
    ]);
  };

  const updateModuleTitle = (index, title) => {
    setModules((prev) => {
      const updatedModules = [...prev];
      updatedModules[index].title = title;
      return updatedModules;
    });
  };

  const updateModuleLectures = (index, lectureCount) => {
    setModules((prev) => {
      const updatedModules = [...prev];
      updatedModules[index].lectures = Array.from(
        { length: lectureCount },
        (_, i) => ({
          id: i + 1,
          title: "",
          quizes: null,
          quizTime: "",
          videourl: "",
        })
      );
      return updatedModules;
    });
  };

  const updateLectureDetails = (moduleIndex, lectureIndex, field, value) => {
    setModules((prev) => {
      const updatedModules = [...prev];
      const updatedLectures = [...updatedModules[moduleIndex].lectures];
      updatedLectures[lectureIndex][field] = value;
      updatedModules[moduleIndex].lectures = updatedLectures;
      return updatedModules;
    });
  };

  const deleteModule = (index) => {
    setChildrenUpdate(!childrenUpdate);
    setModules((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    // Check if all required fields are filled
    for (let module of modules) {
      if (!module.title) {
        onError("Please fill all Title or delete unnecessary Modules");
        return false;
      }
      if (module?.lectures?.length < 1) {
        onError("Please add a lecture");
        return false;
      }
      for (let lecture of module.lectures) {
        if (!lecture.title) {
          onError("Lecture title cannot be empty.");
          return false;
        }
        if (!lecture.videourl) {
          onError("Video URL cannot be empty.");
          return false;
        }
        if (videoRegex.test(lecture.videourl) === false) {
          onError("Please enter a valid video url");
          return false; // Return false if any lecture video URL is not valid
        }
      }
    }

    onSuccess("Modules saved successfully");
    return true;
  };

  // Function to handle the save action
  const handleSave = () => {
    if (validateForm()) {
      setCourse(modules); // Submit the modules data to the parent
      console.log("---------->", modules);
      // alert("Data saved successfully!");
    }
  };

  return (
    <div>
      {/*//@ts-ignore */}
      <CollapseView
        className="h-auto"
        title={"Modules"}
        childrenUpdate={childrenUpdate}
      >
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="my-6 p-4 border rounded-md">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">
                  {`Module ${moduleIndex + 1}: ${module.title || "Untitled"}`}
                </p>
                <button
                  onClick={() => deleteModule(moduleIndex)}
                  className="text-white px-2 py-1 bg-red-500 rounded-md bg-red"
                >
                  Delete
                </button>
              </div>

              <div className="flex flex-row justify-between my-2">
                <p className="w-1/2 font-bold">Module Title</p>
                <input
                  type="text"
                  className="w-1/2 focus:outline-none border-b-[1px]"
                  value={module.title || ""}
                  onChange={(e) =>
                    updateModuleTitle(moduleIndex, e.target.value)
                  }
                  placeholder="Enter Module Name"
                />
              </div>

              <div className="flex flex-row justify-between my-2">
                <p className="w-1/2 font-bold">No of Lectures</p>
                <input
                  type="number"
                  className="w-1/2 focus:outline-none border-b-[1px]"
                  value={module.lectures.length || ""}
                  onChange={(e) => {
                    setChildrenUpdate(!childrenUpdate);
                    updateModuleLectures(
                      moduleIndex,
                      parseInt(e.target.value, 10) || 0
                    );
                  }}
                  placeholder="Enter No of Lectures"
                />
              </div>

              {module.lectures.map((lecture, lectureIndex) => (
                <div
                  key={lecture.id}
                  className="my-8 w-full space-y-4 rounded-md"
                >
                  <div className="bg-secondary p-2 rounded-md">
                    <p className="text-white font-bold">
                      {`Lecture ${lectureIndex + 1}: ${
                        lecture.title || "Untitled"
                      }`}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between my-2">
                    <p className="w-1/2 font-bold">Lecture Title</p>
                    <input
                      type="text"
                      className="w-1/2 focus:outline-none border-b-[1px]"
                      value={lecture.title || ""}
                      onChange={(e) =>
                        updateLectureDetails(
                          moduleIndex,
                          lectureIndex,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Enter Lecture Title"
                    />
                  </div>

                  <div className="flex flex-row justify-between my-2">
                    <p className="w-1/2 font-bold">Lecture Video URL</p>
                    <input
                      type="text"
                      className="w-1/2 focus:outline-none border-b-[1px]"
                      value={lecture.videourl || ""}
                      onChange={(e) =>
                        updateLectureDetails(
                          moduleIndex,
                          lectureIndex,
                          "videourl",
                          e.target.value
                        )
                      }
                      placeholder="Enter Video URL"
                    />
                  </div>
                  <div className="flex justify-end my-6">
                    {lecture?.quizes ? (
                      <div className="text-white px-2 py-1 rounded-md bg-primary">
                        Quiz Added
                      </div>
                    ) : (
                      <button
                        onClick={() =>
                          openQuizModal(lecture, lectureIndex, moduleIndex)
                        }
                        className="text-white px-2 py-1 rounded-md bg-secondary"
                      >
                        Add Quiz
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-end my-6">
            <button
              onClick={addModule}
              className="text-white px-4 py-2 bg-primary rounded-md"
            >
              Add Module
            </button>
          </div>
          {modules.length > 0 && (
            <div className="flex justify-end my-6">
              <button
                onClick={handleSave}
                className="text-white px-4 py-2 bg-green-500 rounded-md bg-primary"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </CollapseView>
      <AddQuizModal
        lecture={currentLecture}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={saveQuiz}
      />
    </div>
  );
};

export default AddMudulesCollapse;
