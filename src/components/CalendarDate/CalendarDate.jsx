import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { useNavigate, Navigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CalendarDate.module.css";

export default function CalendarDate({ dateIdea }) {
  const [date, setDate] = useState(new Date());
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  if (!dateIdea) {
    return <Navigate to="/dates" />;
  }

  const handleSend = () => {
    if (!date) {
      alert("Пожалуйста, выбери дату!");
      return;
    }
    const formattedDate = date.toLocaleDateString("ru-RU");
    const message = `Привет! ❤️ Я выбрала свидание: "${dateIdea}". Давай встретимся ${formattedDate}. Жду с нетерпением! И я знаю, что ты всегда найдешь для меня время.`;
    window.location.href = `https://t.me/IpanterB?text=${encodeURIComponent(message)}`;
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <h2>Договорились! 🎉</h2>
          <p>
            Теперь просто отправь мне это сообщение, и я добавлю дату в свой
            календарь!
          </p>
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
          />
        </div>

        <button className={styles.submitBtn} onClick={handleSend}>
          Подтвердить дату!
        </button>
      </div>
    </div>
  );
}
