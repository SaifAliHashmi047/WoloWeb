import React, { useState } from "react";

const AddQuizModal = ({ lecture, isOpen, onClose, onSave }: any) => {
  const [quizTime, setQuizTime] = useState("");
  const [questions, setQuestions] = useState<any[]>([]); // Array of questions
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: [""],
    correctAnswer: "",
  });

  // Add Current Question to Questions List
  const addCurrentQuestion = () => {
    if (
      currentQuestion.question &&
      currentQuestion.options.length > 0 &&
      currentQuestion.correctAnswer
    ) {
      setQuestions((prev) => [...prev, currentQuestion]);
      setCurrentQuestion({
        question: "",
        options: [""],
        correctAnswer: "",
      });
    } else {
      alert("Please fill all fields for the current question.");
    }
  };

  // Update Current Question
  const updateCurrentQuestion = (field: string, value: any) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Options for Current Question
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    updateCurrentQuestion("options", updatedOptions);
  };

  // Add New Option to Current Question
  const addOption = () => {
    updateCurrentQuestion("options", [...currentQuestion.options, ""]);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-md w-1/2 max-h-[90%] overflow-y-auto space-y-4 my-20">
          <h2 className="text-xl font-bold">Add Quiz for {lecture?.title}</h2>

          <div>
            <label className="block font-semibold">Quiz Time:</label>
            <input
              type="number"
              className="w-full border p-2 rounded-md"
              value={quizTime}
              onChange={(e) => setQuizTime(e.target.value)}
              placeholder="Enter Quiz Time"
            />
          </div>

          <div>
            <label className="block font-semibold">Question:</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md"
              value={currentQuestion.question}
              onChange={(e) =>
                updateCurrentQuestion("question", e.target.value)
              }
              placeholder="Enter Question"
            />
          </div>

          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <label className="block font-semibold">{`Option ${
                index + 1
              }:`}</label>
              <input
                type="text"
                className="flex-1 border p-2 rounded-md"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Enter Option ${index + 1}`}
              />
            </div>
          ))}

          <button
            onClick={addOption}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Add Option
          </button>

          <div>
            <label className="block font-semibold">Correct Answer:</label>
            <select
              className="w-full border p-2 rounded-md"
              value={currentQuestion.correctAnswer}
              onChange={(e) =>
                updateCurrentQuestion("correctAnswer", e.target.value)
              }
            >
              <option value="" disabled>
                Select Correct Answer
              </option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>
                  {option || `Option ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addCurrentQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md bg-secondary"
          >
            Add Question
          </button>

          <div>
            <h3 className="font-bold mt-4">Questions Added:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {questions.map((q, index) => (
                <div>
                  <li key={index}>
                    <strong>Q{index + 1}:</strong> {q.question}
                  </li>
                  <li key={index}>
                    <strong>Answer{index + 1}:</strong> {q.correctAnswer}
                  </li>
                </div>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md bg-red"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (questions.length === 0) {
                  alert("Please add at least one question.");
                  return;
                }
                onSave({ quizTime, questions });
                setQuizTime("");
                setQuestions([]);
                setCurrentQuestion({
                  question: "",
                  options: [""],
                  correctAnswer: "",
                });
                onClose();
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md bg-primary"
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddQuizModal;
