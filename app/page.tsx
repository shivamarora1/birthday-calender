"use client";
import Image from "next/image";
import {eventsData} from "@/app/lib/utils"
import Month from "./ui/month";
import NewBirthday from "./ui/new-birthday";
import { useState } from "react";

export default function Home() {
  const date = new Date();
  const [allEvents, setAllEvents] = useState (eventsData)
  const [showModal, setShowModal] = useState(false);
  const [modalDate, setModalDate] = useState({
    day: date.getDay(),
    month: date.getMonth(),
  });

  // make the events data at outside...
  const handleHideModel = () => {
    setShowModal(false);
  };

  const handleShowModel = (day: number, month: number) => {
    // modal date is set when modal is opened...
    setShowModal(true);
    setModalDate({ day: day, month: month });
  };

  return (
    <>
      <Month
        month={date.getMonth()}
        year={date.getFullYear()}
        showModal={handleShowModel}
      />
      {showModal && (
        <NewBirthday dateObject={modalDate} handleHideModel={handleHideModel} />
      )}
    </>
  );
}
