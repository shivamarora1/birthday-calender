"use client";
type voidReturningFxn = () => void;
export default function MonthHeading({
  month,
  previousMonthFxn,
  nextMonthFxn,
}: {
  month: string;
  previousMonthFxn: voidReturningFxn;
  nextMonthFxn: voidReturningFxn;
}) {
  return (
    <>
      <div className="flex mb-3">
        <div
          className="font-medium text-lg hover:cursor-pointer"
          onClick={() => {
            previousMonthFxn();
          }}
        >
          &lt;
        </div>
        <div className="font-medium text-lg mx-3">{month}</div>
        <div
          className="font-medium text-lg hover:cursor-pointer"
          onClick={() => {
            nextMonthFxn();
          }}
        >
          &gt;
        </div>
      </div>
    </>
  );
}
