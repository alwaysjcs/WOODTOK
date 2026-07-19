import "./App.css";
import { useEffect, useState, useRef } from "react";
import ResultView from "./components/ResultView";
import ModeSelector from "./components/ModeSelector";
import Header from "./components/Header";
import SummaryPanel from "./components/SummaryPanel";
import CurrentPanel from "./components/CurrentPanel";
import SizeSelector from "./components/SizeSelector";
import ProductSelector from "./components/ProductSelector";
import TypeSelector from "./components/TypeSelector";
import ColorSelector from "./components/ColorSelector";
import { PRODUCTS } from "./constants/products";
import { updateCurrentCount } from "./services/countService";

import {
    loadOrderData,
    loadStockData,
    getInitialStockData,
    saveCurrentData
} from "./services/storageService";

function App() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  
  const [selectedDate, setSelectedDate] = useState(
    formatDate(new Date())
  );
  
  const displayDate = new Date(selectedDate);
  
  const todayText =
    `${displayDate.getFullYear()}. ` +
    `${displayDate.getMonth() + 1}. ` +
    `${displayDate.getDate()}(${week[displayDate.getDay()]})`;

  const [product, setProduct] = useState("스트라이프");
  const [type, setType] = useState("기본");
  const [color, setColor] = useState("오크");
  const [selectedSize, setSelectedSize] = useState("616");

  const [orderCounts, setOrderCounts] = useState(() =>
      loadOrderData(formatDate(new Date()))
  );

  const [stockCounts, setStockCounts] = useState(() =>
    loadStockData(formatDate(new Date()))
  );

  const types = Object.keys(PRODUCTS[product]).filter(
  (key) => key !== "colors"
  );

  const colors = PRODUCTS[product].colors;

  const sizes = PRODUCTS[product][type]?.sizes ?? [];

  const [mode, setMode] = useState("order");

  const currentKey = `${product}_${type}_${color}`;
  const counts = mode === "order"
     ? orderCounts
     : stockCounts;

  const setCounts = mode === "order"
     ? setOrderCounts
     : setStockCounts;
 
  const currentCounts = counts[currentKey] || {};

  const currentCount = currentCounts[selectedSize] || 0;

  const increaseCount = () => {
  
      updateCurrentCount({
          counts,
          setCounts,
          currentKey,
          selectedSize,
          delta: 1,
          mode,
          selectedDate,
          onSaved: () => {
              setStockInfo({
                 inherited: false,
                 sourceDate: null
              });
          }    
      });

  };
  
  const decreaseCount = () => {

      updateCurrentCount({
          counts,
          setCounts,
          currentKey,
          selectedSize,
          delta: -1,
          mode,
          selectedDate
      });

  };

  useEffect(() => {
  
      console.log("① selectedDate =", selectedDate);
  
      setOrderCounts(
          loadOrderData(selectedDate)
      );

      const data = getInitialStockData(selectedDate);
      
      setStockCounts(data);
      
      setStockInfo({
          inherited: data._meta?.inherited ?? false,
          sourceDate: data._meta?.sourceDate ?? null
      });
  }, [selectedDate]);

  const basicTotal = Object.entries(counts)
    .filter(([key]) => key.includes("_기본_"))
    .reduce(
       (sum, [, data]) =>
         sum + Object.values(data).reduce((a, b) => a + b, 0),
      0
    );

  const denseTotal = Object.entries(counts)
    .filter(([key]) => key.includes("_촘촘_"))
    .reduce(
      (sum, [, data]) =>
        sum + Object.values(data).reduce((a, b) => a + b, 0),
      0
    );

  const todayTotal = basicTotal + denseTotal;
  const resetTestData = () => {

    const ok = window.confirm(
        "테스트 데이터를 모두 삭제하시겠습니까?"
    );

    if (!ok) return;

    localStorage.removeItem("factoryOrder");
    localStorage.removeItem("factoryStock");

    location.reload();

  };

  const [stockInfo, setStockInfo] = useState({
      inherited: false,
      sourceDate: null
  });

  return (
    <div className="app">

    <Header
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
    <ModeSelector
      mode={mode}
      setMode={setMode}
    />
    
    {mode === "stock" && stockInfo.inherited && (
        <div
            style={{
                margin: "10px 0",
                padding: "10px 14px",
                borderRadius: "8px",
                backgroundColor: "#FFF8E1",
                color: "#8A6D3B",
                fontWeight: "600",
                textAlign: "center"
            }}
        >
            <div>📦 이전 재고를 불러왔습니다.</div>
            <div style={{ fontSize: "13px", fontWeight: "400" }}>
                기준일 : {stockInfo.sourceDate}
            </div>
        </div>
    )}
    
    {mode !== "result" && (
        <div className="card">

<ProductSelector
  product={product}
  setProduct={setProduct}
/>
<hr className="section-divider" />

<TypeSelector
    types={types}
    type={type}
    setType={setType}
/>
<hr className="section-divider" />
<div className="color-size-row">

  <div className="color-column">

    <ColorSelector
      colors={colors}
      color={color}
      setColor={setColor}
    />

  </div>

  <div className="size-column">

    <SizeSelector
      sizes={sizes}
      selectedSize={selectedSize}
      setSelectedSize={setSelectedSize}
    />

  </div>

</div>

<CurrentPanel
  mode={mode}
  product={product}
  type={type}
  color={color}
  selectedSize={selectedSize}
  currentCount={currentCount}
  increaseCount={increaseCount}
  decreaseCount={decreaseCount}
/>

    <SummaryPanel
       mode={mode}
       basicTotal={basicTotal}
       denseTotal={denseTotal}
       todayTotal={todayTotal}
    />
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button
            onClick={resetTestData}
            style={{
                padding: "6px 12px",
                fontSize: "13px",
                borderRadius: "6px",
                cursor: "pointer"
            }}
        >
            🗑 초기화
        </button>
    </div>

    </div>

)}

{mode === "result" && (

  <>

    <ResultView
      product={product}
      selectedDate={selectedDate}
      orderCounts={orderCounts}
      stockCounts={stockCounts}
    />

  </>

)}

  </div>
);
}

export default App;