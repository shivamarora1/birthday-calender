export default function Loader({ showLoader }: { showLoader: boolean }) {
  return (
    <>
      {showLoader && (
        <div className="w-full h-full text-2xl absolute font-bold top-0 bg-black bg-opacity-50 flex justify-center items-center">
          Loading...
        </div>
      )}
    </>
  );
}
