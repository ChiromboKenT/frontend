import React from "react";

const PosterDisplay = ({ posterHtml }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: posterHtml }}
      style={{
        width: "100%",
        height: "100%",
        border: "1px solid #ccc",
        marginTop: "20px",
        padding: "10px",
        overflow: "auto",
      }}
    ></div>
  );
};

export default PosterDisplay;