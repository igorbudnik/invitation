import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import styles from "./Welcome.module.css";

export default function Welcome() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 1 },
      colors: ["#e07a5f", "#b5838d", "#f4a261", "#f3c68f", "#e9c46a"],
    });

    setTimeout(() => {
      navigate("/dates");
    }, 2500);
  };

  const moveButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const btnWidth = 130;
    const btnHeight = 45;
    const padding = 20;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeZoneRadius = 120;

    let randomTop, randomLeft;

    do {
      randomTop = Math.max(padding, Math.random() * maxY);
      randomLeft = Math.max(padding, Math.random() * maxX);
    } while (
      Math.abs(randomLeft + btnWidth / 2 - centerX) < safeZoneRadius &&
      Math.abs(randomTop + btnHeight / 2 - centerY) < safeZoneRadius
    );

    if (!coords) {
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ top: rect.top, left: rect.left });

      requestAnimationFrame(() => {
        setCoords({ top: randomTop, left: randomLeft });
      });
      return;
    }

    setCoords({ top: randomTop, left: randomLeft });
  };

  return (
    <div className={styles.container}>
      {isAccepted && (
        <div className={styles.popupMessage}>Фух, так и знал!:)</div>
      )}

      <div className={styles.envelopeWrapper}>
        <div className={styles.envelope}>
          <div className={styles.envelopeTop}></div>
          <div className={styles.paper}>
            <h2>Особое приглашение!!!</h2>
            <p>
              Тебя ждет выбор, как провести день. Примешь ли ты это предложение?
            </p>
          </div>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.btnAccept} onClick={handleAccept}>
          Принять
        </button>

        <button
          className={`${styles.btnDecline} ${coords ? styles.flying : ""}`}
          style={
            coords ? { top: `${coords.top}px`, left: `${coords.left}px` } : {}
          }
          onMouseEnter={moveButton}
          onClick={moveButton}
          onTouchStart={moveButton}
        >
          Отказаться
        </button>
      </div>
    </div>
  );
}
