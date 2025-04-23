import React, { useState, useEffect } from "react";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";
import styles from "./Form.module.css";
import downloadIcon from "../../../assets/download.svg";

export const Form = () => {
  const [code, setCode] = useState("");
  const [envelope4Unlocked, setEnvelope4Unlocked] = useState(() => {
    const savedState = localStorage.getItem("envelope4Unlocked");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(() => {
    const savedDownloadState = localStorage.getItem("pdfDownloaded");
    return savedDownloadState ? JSON.parse(savedDownloadState) : false;
  });
  const [code4, setCode4] = useState("");
  const [roseDownloaded, setRoseDownloaded] = useState(() => {
    const savedState = localStorage.getItem("roseDownloaded");
    return savedState ? JSON.parse(savedState) : false;
  });

  useEffect(() => {
    localStorage.setItem(
      "envelope4Unlocked",
      JSON.stringify(envelope4Unlocked)
    );
  }, [envelope4Unlocked]);

  useEffect(() => {
    localStorage.setItem("pdfDownloaded", JSON.stringify(pdfDownloaded));
  }, [pdfDownloaded]);

  useEffect(() => {
    localStorage.setItem("roseDownloaded", JSON.stringify(roseDownloaded));
  }, [roseDownloaded]);

  const handleEnvelope3Submit = () => {
    if (code === "роза1942" || code === "Роза1942") {
      setShowModal(true);
    }
  };

  const downloadPdf = (e) => {
    e.stopPropagation();

    // Создаем ссылку для прямого скачивания
    const link = document.createElement("a");
    link.href = "/TheLittlePrince.pdf";
    link.download = "TheLittlePrince.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setPdfDownloaded(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEnvelope4Unlocked(true);
  };
  const closeModal2 = () => {
    setShowModal2(false);
    setEnvelope4Unlocked(true);
  };

  const downloadRose = (e) => {
    e.stopPropagation();

    const link = document.createElement("a");
    link.href = "/Rose.pdf";
    link.download = "Rose.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setRoseDownloaded(true);
  };

  const handleEnvelope4Submit = () => {
    if (code4 === "1111") {
      setShowModal2(true);
    }
  };

  // const resetCache = () => {
  //   localStorage.removeItem("envelope4Unlocked");
  //   localStorage.removeItem("pdfDownloaded");
  //   localStorage.removeItem("roseDownloaded");
  //   setEnvelope4Unlocked(false);
  //   setPdfDownloaded(false);
  //   setRoseDownloaded(false);
  //   setCode("");
  //   setCode4("");
  // };

  return (
    <div className={styles.form}>
      <div className={styles.block}>
        <div className={styles.button__convert3} onClick={downloadPdf}>
          <Button onClick={handleEnvelope3Submit}>Конверт №2</Button>
          <img
            src={downloadIcon}
            alt="Скачать PDF"
            title="Скачать книгу"
            className={pdfDownloaded ? styles.downloadedIcon : ""}
          />
        </div>
        <div className={styles.button__convert3} onClick={downloadRose}>
          <Button onClick={handleEnvelope3Submit}>Конверт №3</Button>
          <img
            src={downloadIcon}
            alt="Скачать PDF"
            title="Скачать книгу"
            className={roseDownloaded ? styles.downloadedIcon : ""}
          />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            placeholder="Введите код №1"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            onClick={handleEnvelope3Submit}
            className={styles.submitButton}
          >
            Отправить
          </Button>
        </div>
        {pdfDownloaded && (
          <div className={styles.hint}>
            Книга "Маленький принц" скачана. Найдите в нём код.
          </div>
        )}
        {roseDownloaded && (
          <div className={styles.hint}>
            Книга "Роза" скачана. Найдите в ней код.
          </div>
        )}
      </div>
      <div
        className={`${styles.block} ${!envelope4Unlocked ? styles.locked : ""}`}
      >
        {/* <div className={styles.button__convert3} onClick={downloadRose}>
          <Button onClick={handleEnvelope4Submit}>Конверт №4</Button>
          <img
            src={downloadIcon}
            alt="Скачать PDF"
            title="Скачать файл"
            className={roseDownloaded ? styles.downloadedIcon : ""}
          />
        </div> */}
        <div className={styles.inputWrapper}>
          <Input
            placeholder="Введите код №2"
            value={code4}
            onChange={(e) => setCode4(e.target.value)}
            disabled={!envelope4Unlocked}
          />
          {!envelope4Unlocked && <div className={styles.lockIcon}>🔒</div>}
          <Button
            onClick={handleEnvelope4Submit}
            className={styles.submitButton}
            disabled={!envelope4Unlocked}
          >
            Отправить
          </Button>
        </div>
        {roseDownloaded && (
          <div className={styles.hint}>
            Файл "Rose" скачан. Найдите в нём код.
          </div>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p>
              Оригинальный браслет графини Офелии де Морнэ находится у вас.
              Узнайте его тайну...
              {"\n"}
              {"\n"}
              Приглядись повнимательнее: число бусин и их цвета - неспроста...
            </p>
            <Button onClick={closeModal}>Закрыть</Button>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p>Я тебя люблю!</p>
            <Button onClick={closeModal2}>Закрыть</Button>
          </div>
        </div>
      )}

      {/* <button className={styles.resetButton} onClick={resetCache}>
        Сбросить прогресс
      </button> */}
    </div>
  );
};
