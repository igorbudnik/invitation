import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import DatesCarousel from "./components/DatesCarousel/DatesCarousel";
import CalendarDate from "./components/CalendarDate/CalendarDate";

export default function App() {
  const [selectedDateIdea, setSelectedDateIdea] = useState(null);

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f1e6",
        minHeight: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/dates"
            element={
              <DatesCarousel onChoose={(idea) => setSelectedDateIdea(idea)} />
            }
          />

          <Route
            path="/calendar"
            element={<CalendarDate dateIdea={selectedDateIdea} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
