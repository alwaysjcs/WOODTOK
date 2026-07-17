function Header({ todayText }) {
  return (
    <div className="header">

      <h1>우드톡</h1>

      <span>{todayText}</span>

    </div>
  );
}

export default Header;