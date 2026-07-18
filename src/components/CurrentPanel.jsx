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
          ? "주문 입력"
          : "재고 입력"}
      </h2>

      <div className="current-row">

  <div className="current-panel">

    <div className="current-info">
      {product} · {type} · {color}
    </div>

    <div className="current-size">
      {selectedSize}
    </div>

    <div className="current-label">
      현재 수량 : {currentCount}개
    </div>

  </div>

  <div className="current-buttons">

    <button
      type="button"
      className="plus-button"
      onClick={increaseCount}
    >
      ＋
    </button>

    <button
      type="button"
      className="minus-button"
      onClick={decreaseCount}
    >
      －
    </button>

  </div>

</div>
    </>
  );
}

export default CurrentPanel;