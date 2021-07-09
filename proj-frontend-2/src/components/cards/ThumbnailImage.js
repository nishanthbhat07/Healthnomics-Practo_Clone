import React from "react";
import classnames from "classnames";
const ThumbnailImage = (props) => {
  const { alt, src, className, rounded, small } = props;
  return (
    <img
      style={{
        objectFit: "cover",
        borderRadius: "4px",
        maxWidth: "75%",
        height: "auto",

        marginLeft: 10,
      }}
      alt={alt}
      src={src}
      className={`img-thumbnail  list-thumbnail align-self-center ${className}  ${classnames(
        {
          "rounded-circle": rounded,
          small: small,
        }
      )}`}
    />
  );
};

export default ThumbnailImage;
