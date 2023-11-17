import { getMonthName } from "../lib/utils";

export default function NewBirthday({
  handleHideModel,
}: {
  handleHideModel: () => void;
}) {
  const day = 12;
  const month = 3;
  const monthName = getMonthName(month);
  return (
    <div className="w-full h-full absolute top-0  bg-black bg-opacity-50 flex justify-center h-screen items-center">
      <div className="w-1/6 h-1/4 border p-2 bg-white rounded-xl">
        <div>
          <label className="block mx-1 text-lg font-medium text-black">
            Title
          </label>
          <input
            type="text"
            id="title"
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
          <button className="bg-blue-500 center w-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
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
