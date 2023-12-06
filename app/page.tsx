"use client";
import Image from "next/image";
import { eventsData } from "@/app/lib/utils";
import Month from "./ui/month";
import NewBirthday from "./ui/new-birthday";
import Loader from "./ui/loader";
import { useState, useEffect } from "react";
import { addDayEvent } from "@/app/lib/utils";
import AuthWall from "@/app/ui/auth";

export default function Home() {
  const date = new Date();
  const [allEvents, setAllEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoader] = useState(false);
  const [passCode, setPasscode] = useState("");
  const [modalDate, setModalDate] = useState({
    day: date.getDay(),
    month: date.getMonth(),
  });

  useEffect(() => {
    if (passCode) {
      showLoader();
      fetch("/api/events", {
        headers: {
          "Api-Key": passCode,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setAllEvents(data))
        .then(() => hideLoader())
        .catch((error) => console.log("error fetching events data: ", error));
    }
  }, [passCode]);

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
    const response = fetch("/api/event", {
      method: "POST",
      headers: {
        "Api-Key": passCode,
      },
      body: JSON.stringify({ month: month, day: day, title: event }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        let newAllEvents = addDayEvent(allEvents, month, day, event);
        setAllEvents(newAllEvents);
      })
      .catch((error) => {
        console.error("API error: ", error.message);
      })
      .finally(() => hideLoader());
  };

  const handleVerifyAuth = async (passcode: string) => {
    showLoader();
    const response = fetch("api/auth", {
      method: "GET",
      headers: {
        "Api-Key": passcode,
      },
    })
      .then((res) => {
        if (res.status==401){
          alert("Wrong password...")
        }
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .then(() => {
        setPasscode(passcode);
      })
      .catch((error) => {
        console.log(`API error: ${error.message}`);
      })
      .finally(() => hideLoader());
  };

  return (
    <>
      <Loader showLoader={isLoading} />
      {!passCode && <AuthWall handleVerifyAuth={handleVerifyAuth} />}
      {/* only render if passcode is available */}
      {passCode && (
        <Month
          month={date.getMonth()}
          year={date.getFullYear()}
          showModal={handleShowModel}
          allEvents={allEvents}
        />
      )}
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
