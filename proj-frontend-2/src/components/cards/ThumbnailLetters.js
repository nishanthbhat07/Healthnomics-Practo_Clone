import React from "react";
import classnames from "classnames";
const ThumbnailLetters = (props) => {
  const { text, color, className, rounded, small } = props;
  let letters = "";
  if (text.indexOf(" ") > -1) {
    text.split(" ").map(word => {
      if (word.length > 1) letters += word.slice(0, 1);
      return "";
    });
  } else {
    letters += text.slice(0, 2);
  }

  if (letters.length > 2) {
    letters = letters.slice(0, 2);
  }

  return (
    <div
      className={`align-self-center list-thumbnail-letters ${
        color ? "btn-" + color : ""
      }  ${className}  ${classnames({
        "rounded-circle": rounded,
        small: small
      })}`}
      title={text}
    >
      {letters}
    </div>
  );
};

export default ThumbnailLetters;
