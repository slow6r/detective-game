import React from "react";
import styles from "./Button.module.css";

export const Button = ({ className, children, ...props }) => {
  return (
    <button className={`${styles.button} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};
 