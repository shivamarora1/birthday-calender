export default function MonthHeading({ month }: { month: string }) {
  return (
    <>
      <div className = "flex mb-3">
        <div className="font-medium text-lg">&lt;</div>
        <div className="font-medium text-lg mx-3">{month}</div>
        <div className="font-medium text-lg">&gt;</div>
      </div>
    </>
  );
}
