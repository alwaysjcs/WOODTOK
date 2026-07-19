import { useRef } from "react";
import logo from "../assets/woodtok-logo.png";

function Header({ selectedDate, setSelectedDate }) {
  const dateRef = useRef(null);

  const openDatePicker = () => {

    const input = dateRef.current;
  
    if (!input) return;
  
    // Chrome
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch (_) {}
    }
  
    // Safari
    input.focus();
  
    setTimeout(() => {
      input.click();
    }, 0);
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
        onChange={(e) => {

            if (!e.target.value) {
                return;
            }
        
            setSelectedDate(e.target.value);
        
        }}
        className="hidden-date-input"
      />
    </div>
  </header>
);
}

export default Header;