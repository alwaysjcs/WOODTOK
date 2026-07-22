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

<div className="current-panel">

  <button
    type="button"
    className="minus-button"
    onClick={decreaseCount}
    
  >
    －
  </button>

  <div className="current-label">
    {currentCount}개
  </div>

  <button
    type="button"
    className="plus-button"
    onClick={increaseCount}
  >
    ＋
  </button>

</div>
    </>
  );
}

const haptic = () => {
  if (navigator.vibrate) {
    navigator.vibrate(20);
  }
};


export default CurrentPanel;