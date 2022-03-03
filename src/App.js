import "./styles.css";

import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG
} from "react-component-export-image";
import React, { useRef, useEffect, useState, createRef } from "react";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Live Card</h1>
      </header>
      <MyComponent />
    </div>
  );
}

function ComponentToPrint(props) {
  const { color, title, description, myImg, time, dayOfTheWeek } = props;
  return (
    <div className="Appp" style={{ backgroundColor: color }}>
      <div className="CardContainer">
        <div className="ImgContainer">
          <div className="ImgBorder">
            <img src={myImg} alt="my" />
          </div>
        </div>
        <div className="MainContainer">
          <div>
            <div className="LiveContainer">
              <div></div>
              <p>ao vivo</p>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="DetailsContainer">
              {dayOfTheWeek} {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyComponent() {
  const [componentRef, setComponentRef] = useState(createRef());
  const [title, setTitle] = useState("Live Title");
  const [description, setDescription] = useState("Live Description");
  const [color, setColor] = useState("#1f44e1");
  const [time, setTime] = useState("22:00");
  const [dayOfTheWeek, setDayOfTheWeek] = useState("Monday");

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const [myImg, setMyImg] = useState(
    "https://avatars.githubusercontent.com/u/33056458?v=4"
  );

  return (
    <>
      <div ref={componentRef} className="ComponentToPrintContainer">
        <ComponentToPrint
          title={title}
          description={description}
          color={color}
          myImg={myImg}
          time={time}
          dayOfTheWeek={dayOfTheWeek}
        />
      </div>
      <div className="FooterContainer">
        <div className="InputContainer">
          <button onClick={() => exportComponentAsJPEG(componentRef)}>
            Export As JPEG
          </button>
          <button onClick={() => exportComponentAsPDF(componentRef)}>
            Export As PDF
          </button>
          <button onClick={() => exportComponentAsPNG(componentRef)}>
            Export As PNG
          </button>
        </div>
        <div className="InputContainer">
          <input
            type="text"
            placeholder="Title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Link img"
            onChange={(event) => {
              setMyImg(event.target.value);
            }}
          />
          <input
            type="datetime-local"
            name="partydate"
            onChange={(event) => {
              //"2017-06-01T08:30"
              console.log(event.target.value);
              const [date, time] = event.target.value.split("T");
              setTime(time);
              const newDate = new Date(date);
              setDayOfTheWeek(weekday[newDate.getDay()]);
            }}
          />
          <input
            type="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
}
