import { render } from "@testing-library/react";
import Day from "../app/ui/day";
import AuthWall from "../app/ui/auth";
import Loader from "../app/ui/loader";

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
