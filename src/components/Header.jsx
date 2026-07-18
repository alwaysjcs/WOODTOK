import { useRef } from "react";
import logo from "../assets/woodtok-logo.png";

function Header({ selectedDate, setSelectedDate }) {
  const dateRef = useRef(null);

  const openDatePicker = () => {

     if (!dateRef.current) return;

     try {
       if (typeof dateRef.current.showPicker === "function") {
         dateRef.current.showPicker();
         return;
       }
     } catch (e) {
     }

     dateRef.current.focus();
    dateRef.current.click();

  };

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

      <div
        className="header-date"
        onClick={openDatePicker}
      >
        📅 {displayDate}

        <input
          ref={dateRef}
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="hidden-date-input"
        />
      </div>
    </header>
  );
}

export default Header;