"use client";
import { useState } from "react";
import { getMonthName } from "../lib/utils";
type DateObject = { day: number; month: number };

export default function NewBirthday({
  dateObject,
  handleHideModel,
  handleSaveEvent,
}: {
  dateObject: DateObject;
  handleHideModel: () => void;
  handleSaveEvent: (month: number, day: number, event: string) => void;
}) {
  const [title, setTitle] = useState("");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const day = dateObject.day;
  const month = dateObject.month;
  const monthName = getMonthName(month);
  return (
    <div className="w-full absolute top-0  bg-black bg-opacity-50 flex justify-center h-screen items-center">
      <div className="w-2/3 h-2/5 lg:w-1/6 lg:h-1/4 border p-2 bg-white rounded-xl">
        <div>
          <label className="block mx-1 text-lg font-medium text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Name of event."
            required
          />
        </div>
        <div>
          <label className="block mx-2 text-lg font-medium text-black mt-2">
            Date
          </label>
          <input
            type="text"
            id="event-date"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={day + " " + monthName}
            required
            disabled
          />
        </div>
        <div className="mt-5 flex text-center justify-center items-center">
          <button
            onClick={() => {
              handleSaveEvent(month, day, title);
            }}
            className="bg-blue-500 center w-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            className="bg-blue-500 w-22 center ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleHideModel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
