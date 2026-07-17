function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize
}) {
  return (
    <>
      <label>사이즈</label>

      <div className="size-list">

        {sizes.map((size) => (

          <button
            key={size}
            type="button"
            className={
              selectedSize === size
                ? "size-button active"
                : "size-button"
            }
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>

        ))}

      </div>
    </>
  );
}

export default SizeSelector;