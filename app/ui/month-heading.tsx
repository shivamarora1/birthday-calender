export default function MonthHeading({ month }: { month: string }) {
  return (
    <>
      <div>
        <div>&lt;</div>
        <div>{month}</div>
        <div>&gt;</div>
      </div>
    </>
  );
}
