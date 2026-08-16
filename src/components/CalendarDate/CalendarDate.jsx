import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { useNavigate, Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CalendarDate.module.css";

export default function CalendarDate({ dateIdea }) {
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState("");
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  if (!dateIdea) {
    return <Navigate to="/dates" />;
  }

  const handleSend = () => {
    if (!date) {
      alert("Выбери дату!");
      return;
    }

    const formattedDate = date.toLocaleDateString("ru-RU");

    let message = `${dateIdea}. Дата встречи ${formattedDate}.`;

    if (comment.trim()) {
      message += `\n\nДополнения: ${comment}`;
    }

    setIsSent(true);

    setTimeout(() => {
      window.location.href = `https://t.me/IpanterB?text=${encodeURIComponent(message)}`;
    }, 2000);
  };

  if (isSent) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <h2>🎉🎉🎉</h2>
          <p>Супер! Сейчас перенесет в наш чат:)</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <div className={styles.card}>
        <h2>Отличный выбор!</h2>
        <p>
          Ты выбрала: <b>{dateIdea}</b>
        </p>
        <p>Выбери удобный для тебя день:</p>

        <div className={styles.calendarWrapper}>
          <DatePicker
            selected={date}
            onChange={(newDate) => setDate(newDate)}
            locale={ru}
            inline
            minDate={new Date()}
            excludeDates={[new Date(2026, 7, 21)]}
          />
        </div>

        <textarea
          className={styles.commentInput}
          placeholder="Напиши, чего бы тебе хотелось дополнительно"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />

        <button className={styles.submitBtn} onClick={handleSend}>
          Подтвердить дату!
        </button>
      </div>
    </div>
  );
}
