import { useEffect, useState } from "react";

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

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [currentCount]);

  const [pressed, setPressed] = useState("");
  
  const press = (type, callback) => {
  
      setPressed(type);
  
      callback();
  
      setTimeout(() => {
          setPressed("");
      }, 100);
  
  };

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
          className={`minus-button ${pressed === "minus" ? "button-pressed" : ""}`}
          onClick={() => press("minus", decreaseCount)}
        >
          －
        </button>

        <div
          className={`current-label ${animate ? "count-pop" : ""}`}
        >
          {currentCount}개
        </div>

        <button
          type="button"
          className={`plus-button ${pressed === "plus" ? "button-pressed" : ""}`}
          onClick={() => press("plus", increaseCount)}
        >
          ＋
        </button>

      </div>
    </>
  );
}

export default CurrentPanel;