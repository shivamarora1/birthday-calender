import Image from "next/image";
import Month from "./ui/month";

export default function Home() {
  const date = new Date();

  return (
    <>
      <Month month={date.getMonth()} year={date.getFullYear()} />
    </>
  );
}
