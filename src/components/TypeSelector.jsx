function TypeSelector({ type, setType }) {
  return (
    <div className="inline-selector">

      <div className="inline-label">
        타입
      </div>

      <div className="button-group">
        <button
          type="button"
          className={type === "기본" ? "active" : ""}
          onClick={() => setType("기본")}
        >
          기본
        </button>

        <button
          type="button"
          className={type === "촘촘" ? "active" : ""}
          onClick={() => setType("촘촘")}
        >
          촘촘
        </button>
      </div>

    </div>
  );
}

export default TypeSelector;