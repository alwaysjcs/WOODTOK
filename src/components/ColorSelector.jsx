function ColorSelector({
  colors,
  color,
  setColor
}) {
  return (
    <>
      <label>색상</label>

      <div className="button-group">
        {colors.map((item) => (
          <button
            key={item}
            className={color === item ? "active" : ""}
            onClick={() => setColor(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default ColorSelector;