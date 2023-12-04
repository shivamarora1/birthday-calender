"use client";
import { useState } from "react";

export default function AuthWall({
  handleVerifyAuth,
}: {
  handleVerifyAuth: (passcode: string) => void;
}) {
  const [passcode, setPasscode] = useState("");
  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasscode(e.target.value);
  };
  return (
    <>
      <div className="w-full h-full absolute top-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="w-6/6 h-1/4 sm:w-3/6 sm:h-1/6 lg:w-1/6 lg:h-1/6 border p-2 bg-white rounded-xl">
          <div>
            <label className="block mx-1 text-lg font-medium text-black">
              Enter secret code to proceed.
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={handlePasscodeChange}
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:border-blue-500 black w-full p-2.5"
              placeholder="Enter passcode"
              required
            />
          </div>
          <div className="mt-5 flex text-center justify-center items-center">
            <button
              className="bg-blue-500 center w-20 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => {
                handleVerifyAuth(passcode);
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
