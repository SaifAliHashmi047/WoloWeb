import React, { useState } from "react";
import { CollapseView } from "./CollapseView";
import moment from "moment";
const meetingURLPattern =
  /^(https?:\/\/(meet\.google\.com\/[a-zA-Z0-9-]+|zoom\.us\/j\/[0-9]+))$/;

const AddSessions = ({ setCourse, onError, onSuccess }) => {
  const [sessions, setSessions] = useState([
    { title: "", date: "", startTime: "", endTime: "", meetingUrl: "" },
  ]);

  const handleChange = (index: number, field: string, value: string) => {
    const newSessions = [...sessions];
    newSessions[index][field] = value;
    setSessions(newSessions);
  };

  const handleAddSession = () => {
    setSessions([
      ...sessions,
      { title: "", date: "", startTime: "", endTime: "", meetingUrl: "" },
    ]);
  };

  const handleRemoveSession = (index: number) => {
    const newSessions = sessions.filter((_, i) => i !== index);
    setSessions(newSessions);
  };

  const validatedata = () => {
    //@ts-ignore
    const hasError = sessions.some((session) => {
      if (!session.title) {
        onError("Please enter a valid Title");
        return true;
      }
      if (!session.date) {
        onError("Please enter a valid Meeting Date");
        return true;
      }
      if (!session.startTime) {
        onError("Please enter a valid Start Time");
        return true;
      }
      if (!session.endTime) {
        onError("Please enter a valid End Time");
        return true;
      }
      if (!session.meetingUrl) {
        onError("Please enter a valid Meeting url");
        return true;
      }
      if (!meetingURLPattern.test(session.meetingUrl)) {
        onError("Please enter a valid Meeting url");
        return true; // Return false if any lecture video URL is not valid
      }
    });

    if (hasError) {
      // alert("Please fill all fields");
    } else {
      const saveSessions = sessions.map((session) => {
        // Combine date and time into ISO 8601 format
        const startDateTime = moment(
          `${session.date}T${session.startTime}`
        ).toISOString();
        const endDateTime = moment(
          `${session.date}T${session.endTime}`
        ).toISOString();

        return {
          title: session.title,
          starttime: startDateTime,
          endtime: endDateTime,
          link: session.meetingUrl,
        };
      });
      console.log("---------->>>>>", saveSessions);
      setCourse(saveSessions);
      onSuccess("Sessions saved successfully");
    }
  };

  return (
    //@ts-ignore
    <CollapseView className="" title={"Sessions"}>
      <div className="flex flex-col w-full">
        {sessions.map((session, index) => (
          <div key={index} className="mb-4">
            <div className="flex flex-row justify-between my-2">
              <p className="w-1/2 font-bold">Title</p>
              <input
                type="text"
                value={session.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-1/2 focus:outline-none border-b-[1px]"
                placeholder="Meeting Title"
              />
            </div>
            <div className="flex flex-row justify-between my-2">
              <p className="w-1/2 font-bold">Date</p>
              <input
                type="date"
                value={session.date}
                onChange={(e) => handleChange(index, "date", e.target.value)}
                className="w-1/2 focus:outline-none border-b-[1px]"
              />
            </div>
            <div className="flex flex-row justify-between my-2">
              <p className="w-1/2 font-bold">Start Time</p>
              <input
                type="time"
                value={session.startTime}
                onChange={(e) =>
                  handleChange(index, "startTime", e.target.value)
                }
                className="w-1/2 focus:outline-none border-b-[1px]"
              />
            </div>
            <div className="flex flex-row justify-between my-2">
              <p className="w-1/2 font-bold">End Time</p>
              <input
                type="time"
                value={session.endTime}
                onChange={(e) => handleChange(index, "endTime", e.target.value)}
                className="w-1/2 focus:outline-none border-b-[1px]"
              />
            </div>
            <div className="flex flex-row justify-between my-2">
              <p className="w-1/2 font-bold">Meeting Url</p>
              <input
                type="text"
                value={session.meetingUrl}
                onChange={(e) =>
                  handleChange(index, "meetingUrl", e.target.value)
                }
                className="w-1/2 focus:outline-none border-b-[1px]"
                placeholder="Enter Meeting Url"
              />
            </div>

            {/* {sessions.length > 1 && (
              <button
                onClick={() => handleRemoveSession(index)}
                className="text-red-500 mt-2 bg-red"
              >
                Remove Session
              </button>
            )} */}
          </div>
        ))}

        {/* <div className="flex justify-end my-6">
          <button
            onClick={handleAddSession}
            className="text-white px-2 py-1 rounded-md bg-secondary"
          >
            Add More Session
          </button>
        </div> */}
        <div className="flex justify-end">
          <button
            onClick={validatedata}
            className="bg-green-500 text-white py-2 px-4 rounded-md bg-primary"
          >
            Save
          </button>
        </div>
      </div>
    </CollapseView>
  );
};

export default AddSessions;
