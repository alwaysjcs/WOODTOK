function ProductSelector({ product, setProduct }) {
  return (
    <>
      <label>제품</label>

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
    </>
  );
}

export default ProductSelector;