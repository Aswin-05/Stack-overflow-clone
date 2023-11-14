import React from "react";

const Avatar = ({
  children,
  backgroundColor,
  color,
  borderRadius,
  fontSize,
  cursor,
  justifyContent,
  px,
  py
}) => {
    const style = {
        backgroundColor,
        // width,
        // height,
        color: color || "black",
        padding: `${py} ${px}`,
        borderRadius,
        fontSize,
        cursor: cursor || null,
        display:"flex",
        justifyContent,
        alignItems:"center"
    };

    return <div style={style}>{children}</div>;
};

export default Avatar;
