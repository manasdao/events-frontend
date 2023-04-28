import React from "react";

function SingleBanner({
  text,
  imageUrl = "https://images.unsplash.com/photo-1639987759021-bc55a0c96ce1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2344&q=80",
}) {
  return (
    <div
      className="bg-white  grid items-center"
      style={{ gridTemplateColumns: "2fr 3fr" }}
    >
      <div className=" pl-4">
        {text || (
          <>
            <span className="text-gray-400 text-xl font-semibold">
              Welcome to
            </span>
            <br />
            <span className="text-gray-900 text-xl font-semibold">
              DAOCON Paris
            </span>
          </>
        )}
      </div>
      <img
        src={imageUrl}
        alt="banner img"
        className="w-full object-cover"
        style={{
          clipPath:
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 20% 0%, 0% 0%)",
        }}
      />
    </div>
  );
}

export default SingleBanner;
