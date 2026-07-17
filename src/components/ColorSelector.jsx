function ColorSelector({
  colors,
  color,
  setColor
}) {
  return (
    <>
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