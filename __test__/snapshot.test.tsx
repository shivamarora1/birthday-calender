import { render } from "@testing-library/react";
import Day from "../app/ui/day";
import AuthWall from "../app/ui/auth";
import Loader from "../app/ui/loader";
import MonthHeading from "@/app/ui/month-heading";
import Month from "@/app/ui/month";
import NewBirthday from "@/app/ui/new-birthday";

it("day renders correctly", () => {
  const tree = render(
    <Day
      date={new Date(2023, 1, 1)}
      eventsParam={["Event-1", "Event-2"]}
      showModal={(day, month) => {
        return `Day is ${day} and Month is ${month}`;
      }}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("day renders without event correctly", () => {
  const tree = render(
    <Day
      date={new Date(2023, 2, 1)}
      eventsParam={[]}
      showModal={(day, month) => {
        return `Day is ${day} and Month is ${month}`;
      }}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("day renders all events correctly", () => {
  const tree = render(
    <Day
      date={new Date(2023, 3, 1)}
      eventsParam={[
        "Event-1",
        "Event-2",
        "Event-3",
        "Event-4",
        "Event-5",
        "Event-6",
        "Event-7",
        "Event-8",
      ]}
      showModal={(day, month) => {
        return `Day is ${day} and Month is ${month}`;
      }}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("auth renders correctly", () => {
  const tree = render(<AuthWall handleVerifyAuth={(passcode: string) => {}} />);
  expect(tree).toMatchSnapshot();
});

it("show loader renders correctly", () => {
  const tree = render(<Loader showLoader={true} />);
  expect(tree).toMatchSnapshot();
});

it("hide loader renders correctly", () => {
  const tree = render(<Loader showLoader={false} />);
  expect(tree).toMatchSnapshot();
});

it("month heading page", () => {
  const tree = render(
    <MonthHeading
      month={"January"}
      previousMonthFxn={() => {}}
      nextMonthFxn={() => {}}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("month rendering with no events", () => {
  const tree = render(
    <Month
      month={3}
      year={2021}
      showModal={(day, month) => {}}
      allEvents={{}}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("month rendering with events data", () => {
  const tree = render(
    <Month
      month={3}
      year={2023}
      showModal={(day, month) => {}}
      allEvents={{ 3: { 3: ["event-1", "event-2"], 5: ["event-3"] } }}
    />
  );
  expect(tree).toMatchSnapshot();
});

it("new birthday render", () => {
  const tree = render(
    <NewBirthday
      dateObject={{ day: 3, month: 3 }}
      handleHideModel={() => {}}
      handleSaveEvent={(month, day, event) => {}}
    />
  );
  expect(tree).toMatchSnapshot();
});
