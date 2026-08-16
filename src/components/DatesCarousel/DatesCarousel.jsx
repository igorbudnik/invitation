import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import glina from "../../photos/glina.png";
import sh from "../../photos/sh.png";
import kino from "../../photos/kino.png";
import ride from "../../photos/ride.png";
import padal from "../../photos/padal.png";
import pirates from "../../audio/pirates.mp3";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./DatesCarousel.module.css";

const DATES_MOCK = [
  {
    id: 1,
    title: "Поиграем в падал теннис",
    desc: "Активно проведем время и помашем ракетками",
    image: padal,
  },
  {
    id: 2,
    title: "Уютно посидим посмотрим фильм",
    desc: "Закажем любимую еду и посмотрим фильм или начнем смотреть сериал",
    image: kino,
  },
  {
    id: 3,
    title: "Погуляем по Шарташу",
    desc: "Да, я живу в Екб 25 лет и ниразу там не гулял)",
    image: sh,
  },
  {
    id: 4,
    title: "Рванем куда-нибудь за город",
    desc: "Поедем кайфанем от музыки и погуляем по интересным местам",
    image: ride,
  },
  {
    id: 5,
    title: "Сходим на мастер-класс",
    desc: "Помесим что-нибудь из глины",
    image: glina,
  },
];

export default function DatesCarousel({ onChoose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const bgMusic = new Audio(pirates);

    bgMusic.loop = true;
    bgMusic.volume = 0.1;

    bgMusic.play().catch((err) => {
      console.log("Автовоспроизведение заблокировано браузером:", err);
    });

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []);

  const handleChoose = (title) => {
    if (onChoose) onChoose(title);
    navigate("/calendar");
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад
      </button>

      <h2 className={styles.header}>Выбери, как мы проведем время:</h2>

      <div className={styles.carouselWrapper}>
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          className={styles.swiperContainer}
        >
          {DATES_MOCK.map((item) => (
            <SwiperSlide key={item.id} className={styles.swiperSlide}>
              <div className={styles.card}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button
                  className={styles.chooseBtn}
                  onClick={() => handleChoose(item.title)}
                >
                  Выбрать!
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
