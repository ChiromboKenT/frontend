import React from "react";
import DOMPurify from "dompurify";

const PosterDisplay = ({posterHtml}) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(posterHtml);

  return (
    <div
      dangerouslySetInnerHTML={{__html: sanitizedHtml}}
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
