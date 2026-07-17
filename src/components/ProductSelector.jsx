function ProductSelector({ product, setProduct }) {
  return (
    <div className="inline-selector">

      <div className="inline-label">
        제품
      </div>

      <div className="button-group">
        <button
          type="button"
          className={product === "스트라이프" ? "active" : ""}
          onClick={() => setProduct("스트라이프")}
        >
          스트라이프
        </button>

        <button
          type="button"
          className={product === "가벽" ? "active" : ""}
          onClick={() => setProduct("가벽")}
        >
          가벽
        </button>
      </div>

    </div>
  );
}

export default ProductSelector;