import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

// Импортируем стили Swiper
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./DatesCarousel.module.css";

const DATES_MOCK = [
  {
    id: 1,
    title: "Уютный вечер с кино",
    desc: "Закажем любимую еду, завернемся в плед и посмотрим фильм.",
    image: "https://via.placeholder.com/300x200?text=Movie+Night",
  },
  {
    id: 2,
    title: "Прогулка и кофе",
    desc: "Пройдемся по красивым местам, возьмем горячий кофе и просто поболтаем.",
    image: "https://via.placeholder.com/300x200?text=Coffee+Walk",
  },
  {
    id: 3,
    title: "Ужин при свечах",
    desc: "Я приготовлю (или закажу) вкусный ужин, зажжем свечи.",
    image: "https://via.placeholder.com/300x200?text=Romantic+Dinner",
  },
];

export default function DatesCarousel({ onChoose }) {
  const navigate = useNavigate();

  const handleChoose = (title) => {
    if (onChoose) onChoose(title);
    navigate("/calendar");
  };

  return (
    <div className={styles.container}>
      {/* Кнопка НАЗАД */}
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
                  Выбрать это!
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
