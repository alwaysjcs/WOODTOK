function SummaryPanel({
  mode,
  basicTotal,
  denseTotal,
  todayTotal
}) {
  return (
    <>
      <hr />

      <div className="summary-title">

        <span>
          {mode === "order"
            ? "주문 집계 :"
            : "재고 집계 :"}
        </span>
      
        <span className="summary-result">
          기본 {basicTotal}, 촘촘 {denseTotal}, 전체 {todayTotal}
        </span>
      
      </div>
          </>
        );
      }

export default SummaryPanel;