import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";

export default function Welcome() {
  const navigate = useNavigate();
  const [coords, setCoords] = useState(null);

  const moveButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const btnWidth = 130;
    const btnHeight = 45;
    const padding = 20;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Центр экрана, где расположена кнопка "Принять"
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeZoneRadius = 120; // Радиус зоны безопасности вокруг кнопки "Принять"

    let randomTop, randomLeft;

    // Цикл гарантирует, что кнопка НЕ улетит в зону кнопки "Принять"
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
      <div className={styles.envelopeWrapper}>
        <div className={styles.envelope}>
          <div className={styles.envelopeTop}></div>
          <div className={styles.paper}>
            <h2>Особое приглашение</h2>
            <p>
              Я никуда не пропаду, просто иногда бываю в делах. Но для тебя у
              меня всегда найдется время. Пойдем на свидание? ❤️
            </p>
          </div>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button className={styles.btnAccept} onClick={() => navigate("/dates")}>
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
