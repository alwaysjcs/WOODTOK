function ModeSelector({ mode, setMode }) {
  return (
    <div className="mode-group">

      <button
        className={mode === "order" ? "active" : ""}
        onClick={() => setMode("order")}
      >
        📝 주문
      </button>

      <button
        className={mode === "stock" ? "active" : ""}
        onClick={() => setMode("stock")}
      >
        📦 재고
      </button>

      <button
        className={mode === "result" ? "active" : ""}
        onClick={() => setMode("result")}
      >
        📊 결과
      </button>

    </div>
  );
}

export default ModeSelector;