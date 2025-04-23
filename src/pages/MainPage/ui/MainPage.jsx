import React from "react";
import { Form } from "../../../features/Form";
import styles from "./MainPage.module.css";
import ocelotImage from "../../../assets/D3mCeaS8da.png";

export const MainPage = () => {
  return (
    <div className={styles.page}>
      <Form />
      <img src={ocelotImage} className={styles.ocelot} alt="" />
    </div>
  );
};
