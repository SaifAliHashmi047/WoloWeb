import React, { useState } from "react";
import { CollapseView } from "./CollapseView";
import moment from "moment";

const AddAvalibility = ({ setAgora, onError, onSuccess }) => {
  const [startTime, setStartTime] = useState<any>("");
  const [endTime, setEndTime] = useState<any>("");
  const validatedata = () => {
    //@ts-ignore

    if (startTime.length < 2) {
      onError("Please select a your availability Start time");
      return;
    }
    if (endTime.length < 2) {
      onError("Please select a your availability End time");
      return;
    }
    const now = moment();
    // console.log("------------------_>1234565432", startTime);
    const startTimeString = moment(
      `${now.format("YYYY-MM-DD")} ${startTime}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();
    const endTimeString = moment(
      `${now.format("YYYY-MM-DD")} ${endTime}`,
      "YYYY-MM-DD HH:mm"
    ).toISOString();

    const agoraSessions = {
      startTime: startTimeString,
      endTime: endTimeString,
    };
    setAgora(agoraSessions);
    onSuccess("Availability Saved Successfully");
    console.log("------------------_>1234565432", agoraSessions);
  };

  return (
    //@ts-ignore
    <CollapseView className="" title={"Availability"}>
      <div className="flex flex-col w-full">
        <div className="mb-4">
          <div className="flex flex-row justify-between my-2">
            <p className="w-1/2 font-bold">From</p>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e?.target?.value)}
              className="w-1/2 focus:outline-none border-b-[1px]"
            />
          </div>
          <div className="flex flex-row justify-between my-2">
            <p className="w-1/2 font-bold">to</p>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e?.target?.value)}
              className="w-1/2 focus:outline-none border-b-[1px]"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => validatedata()}
            className="bg-green-500 text-white py-2 px-4 rounded-md bg-primary"
          >
            Save
          </button>
        </div>
      </div>
    </CollapseView>
  );
};

export default AddAvalibility;
