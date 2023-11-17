"use client";
import Image from "next/image";
import Month from "./ui/month";
import NewBirthday from "./ui/new-birthday";
import { useState } from "react";

export default function Home() {
  const date = new Date();
  const [showModal, setShowModal] = useState(false);

  const handleHideModel = () => {
    setShowModal(false);
  };
  const handleShowModel = () => {
    setShowModal(true);
  };

  return (
    <>
      <Month
        month={date.getMonth()}
        year={date.getFullYear()}
        showModal={handleShowModel}
      />
      {showModal && <NewBirthday handleHideModel={handleHideModel}/>}
    </>
  );
}
