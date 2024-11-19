import React, { useState } from "react";
import { CollapseView } from "./CollapseView";
import { callApi } from "../Api/CallAPI";
import { api } from "../Api/Enviornment";

const AddResources = ({ setCourse, onError, onSuccess }) => {
  const [resources, setResources] = useState<any[]>([
    { title: "", document: null },
  ]);
  const [childrenUpdate, setChildrenUpdate] = useState<any>(false);

  // Handle the change in the resource title
  const handleTitleChange = (index: number, value: string) => {
    const updatedResources = [...resources];
    updatedResources[index].title = value;
    setResources(updatedResources);
  };

  // Handle the change in the resource document (file upload)
  const handleDocChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedResources = [...resources];
    updatedResources[index].document = e.target.files?.[0] || null;
    setResources(updatedResources);
  };

  // Add a new empty resource
  const addNewResource = () => {
    setChildrenUpdate(!childrenUpdate);
    setResources([...resources, { title: "", document: null }]);
  };

  // Delete a resource
  const deleteResource = (index: number) => {
    setResources((prev) => prev.filter((_, i) => i !== index));
  };

  // Save function with validation
  const handleSave = async () => {
    // Validate all fields
    const hasError = resources.some((resource) => {
      if (!resource.title) {
        onError("Please enter a valid resourse Title");
        return true;
      }
      if (!resource.document) {
        onError("Please enter a valid resourse Document");
        return true;
      }
    });

    if (hasError) {
      // alert("Please fill all fields");
    } else {
      console.log("Resources saved:", resources);
      const url = await fileUploadUrl(resources[0].document);
      const imageUrl = url?.url;
      console?.log("---------->", imageUrl);
      setCourse([{ title: resources?.[0]?.title, document: imageUrl }]);
      onSuccess("Resources saved successfully");
    }
  };
  const fileUploadUrl = async (file: any) => {
    const file1 = { file };
    const response = await callApi(api?.fileUpload, "POST", file1, true);
    console?.log("---------------->", file1);
    return response;
  };

  return (
    //@ts-ignore
    <CollapseView
      className=""
      title="Resources"
      childrenUpdate={childrenUpdate}
    >
      <div className="flex flex-col w-full space-y-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="flex flex-col bg-white p-4 rounded-lg shadow-md space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="w-full sm:w-1/3 font-semibold text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="w-full sm:w-2/3 border-b-2 border-gray-300 focus:outline-none p-2"
                value={resource.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                placeholder="Enter Resource Title"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <label className="w-full sm:w-1/3 font-semibold text-gray-700">
                Document
              </label>
              <input
                type="file"
                accept=".doc,.docx,.pdf,.txt"
                onChange={(e) => handleDocChange(index, e)}
                className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2"
              />
            </div>
            {/* <div className="flex justify-end">
              <button
                onClick={() => deleteResource(index)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div> */}
          </div>
        ))}

        {/* Button to Add New Resource */}
        <div className="flex justify-end">
          <button
            onClick={addNewResource}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Add New Resource
          </button>
        </div>

        {/* Save Button with Validation */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-md bg-primary"
          >
            Save
          </button>
        </div>
      </div>
    </CollapseView>
  );
};

export default AddResources;
