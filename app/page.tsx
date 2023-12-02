"use client";
import Image from "next/image";
import { eventsData } from "@/app/lib/utils";
import Month from "./ui/month";
import NewBirthday from "./ui/new-birthday";
import Loader from "./ui/loader";
import { useState, useEffect } from "react";
import { addDayEvent } from "@/app/lib/utils";

export default function Home() {
  const date = new Date();
  const [allEvents, setAllEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [modalDate, setModalDate] = useState({
    day: date.getDay(),
    month: date.getMonth(),
  });

  useEffect(() => {
    showLoader();
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setAllEvents(data))
      .then(() => hideLoader())
      .catch((error) => console.log("error fetching events data: ", error));
  }, []);

  // make the events data at outside...
  const handleHideModel = () => {
    setShowModal(false);
  };
  const showLoader = () => {
    setLoader(true);
  };
  const hideLoader = () => {
    setLoader(false);
  };
  const handleShowModel = (day: number, month: number) => {
    // modal date is set when modal is opened...
    setShowModal(true);
    setModalDate({ day: day, month: month });
  };

  const handleAddEvent = async (month: number, day: number, event: string) => {
    showLoader();
    handleHideModel();
    try {
      const response = fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({ month: month, day: day, title: event }),
      })
        .then(() => {
          let newAllEvents = addDayEvent(allEvents, month, day, event);
          setAllEvents(newAllEvents);
        })
        .finally(() => hideLoader());
    } catch (error) {
      console.log("error saving event data:", error);
    }
  };

  return (
    <>
      <Loader showLoader={isLoading} />
      <Month
        month={date.getMonth()}
        year={date.getFullYear()}
        showModal={handleShowModel}
        allEvents={allEvents}
      />
      {showModal && (
        <NewBirthday
          dateObject={modalDate}
          handleHideModel={handleHideModel}
          handleSaveEvent={handleAddEvent}
        />
      )}
    </>
  );
}
