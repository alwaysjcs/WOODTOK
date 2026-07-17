function SummaryPanel({
  mode,
  basicTotal,
  denseTotal,
  todayTotal
}) {
  return (
    <>
      <hr />

      <h2>
        {mode === "order"
          ? "오늘 주문 집계"
          : "오늘 재고 집계"}
      </h2>

      <div className="summary">
        기본 {basicTotal}, 촘촘 {denseTotal}, 전체 {todayTotal}
      </div>
    </>
  );
}

export default SummaryPanel;