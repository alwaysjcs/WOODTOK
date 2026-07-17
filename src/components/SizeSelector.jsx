function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize
}) {
  return (
    <>
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