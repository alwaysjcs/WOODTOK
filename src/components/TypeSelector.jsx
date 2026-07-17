function TypeSelector({
  types,
  type,
  setType
}) {
  return (
    <>
      <label>타입</label>

      <div className="button-group">
        {types.map((item) => (
          <button
            key={item}
            className={type === item ? "active" : ""}
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default TypeSelector;