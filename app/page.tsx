"use client";
import Image from "next/image";
import { eventsData } from "@/app/lib/utils";
import Month from "./ui/month";
import NewBirthday from "./ui/new-birthday";
import { useState, useEffect } from "react";
import { addDayEvent } from "@/app/lib/utils";

export default function Home() {
  const date = new Date();
  const [allEvents, setAllEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalDate, setModalDate] = useState({
    day: date.getDay(),
    month: date.getMonth(),
  });

  useEffect(() => {
    fetch("/api/events")
      .then((response) => response.json())
      .then((data) => setAllEvents(data))
      .catch((error) => console.log("error fetching events data: ", error));
  }, []);

  // make the events data at outside...
  const handleHideModel = () => {
    setShowModal(false);
  };

  const handleShowModel = (day: number, month: number) => {
    // modal date is set when modal is opened...
    setShowModal(true);
    setModalDate({ day: day, month: month });
  };

  const handleAddEvent = async (month: number, day: number, event: string) => {
    try {
      const response = fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({ month: month, day: day, title: event }),
      });

      let newAllEvents = addDayEvent(allEvents, month, day, event);
      setAllEvents(newAllEvents);
      handleHideModel();
    } catch (error) {
      console.log("error saving event data:", error);
    }
  };

  return (
    <>
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
