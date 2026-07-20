import { useRef } from "react";
import logo from "../assets/woodtok-logo.png";

function Header({ selectedDate, setSelectedDate }) {
  const dateRef = useRef(null);

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const date = new Date(selectedDate);

  const displayDate =
     selectedDate.replaceAll("-", ".") +
     ` (${week[date.getDay()]})`;

  return (
  <header className="header">
    <div className="header-left">
      <img
        src={logo}
        alt="WOODTOK"
        className="header-logo"
      />
    </div>

    <div className="header-date"
    >
      📅 {displayDate}

      <input
          ref={dateRef}
          type="date"
          value={selectedDate}
          onChange={(e) => {
      
              if (!e.target.value) {
                  return;
              }
      
              setSelectedDate(e.target.value);
      
          }}
          className="header-date-input"
      />
    </div>
  </header>
);
}

export default Header;