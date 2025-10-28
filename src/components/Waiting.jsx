import { ShimmerDiv } from "shimmer-effects-react";

const Waiting = ({ message }) => {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <ShimmerDiv
        className="absolute inset-0 z-0"
        mode="dark"
        height="100%"
        width="100%"
        loading={true}
      />

      <div className="z-10 text-white text-xl font-semibold text-center px-4">
        {message}
      </div>
    </div>
  );
};

export default Waiting;
