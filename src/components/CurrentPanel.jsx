function CurrentPanel({
  mode,
  product,
  type,
  color,
  selectedSize,
  currentCount,
  increaseCount,
  decreaseCount
}) {
  return (
    <>
      <hr />

      <h2>
        {mode === "order"
          ? "현재 작업"
          : "현재 재고"}
      </h2>

      <div className="current-card">

        <div className="current-info">
          {product} / {type} / {color}
        </div>

        <div className="current-size">
          {selectedSize}
        </div>

        <div className="current-count">
          {currentCount} 개
        </div>

      </div>

      <div className="current-buttons">

        <button
          type="button"
          className="plus-button"
          onClick={increaseCount}
        >
          ➕
        </button>

        <button
          type="button"
          className="minus-button"
          onClick={decreaseCount}
        >
          ➖
        </button>

      </div>
    </>
  );
}

export default CurrentPanel;