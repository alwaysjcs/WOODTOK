import "./App.css";
import { useEffect, useState } from "react";
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

  const [orderCounts, setOrderCounts] = useState({});
  const [stockCounts, setStockCounts] = useState({});

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
    setCounts((prev) => {
  
      const data = { ...(prev[currentKey] || {}) };
  
      data[selectedSize] = (data[selectedSize] || 0) + 1;
  
      return {
        ...prev,
        [currentKey]: data
      };
  
    });
  };
  
  const decreaseCount = () => {
    setCounts((prev) => {
  
      const data = { ...(prev[currentKey] || {}) };
  
      data[selectedSize] = Math.max(
        0,
        (data[selectedSize] || 0) - 1
      );
  
      return {
        ...prev,
        [currentKey]: data
      };
  
    });
  };  

  useEffect(() => {

    const savedOrder = localStorage.getItem(
      `factoryOrder_${selectedDate}`
    );
  
    setOrderCounts(
      savedOrder ? JSON.parse(savedOrder) : {}
    );
  
    const savedStock = localStorage.getItem(
      `factoryStock_${selectedDate}`
    );
  
    setStockCounts(
      savedStock ? JSON.parse(savedStock) : {}
    );
  
  }, [selectedDate]);

  useEffect(() => {

    localStorage.setItem(
        `factoryOrder_${selectedDate}`,
        JSON.stringify(orderCounts)
    );

  }, [orderCounts, selectedDate]);
  
  useEffect(() => {
  
      localStorage.setItem(
          `factoryStock_${selectedDate}`,
          JSON.stringify(stockCounts)
      );
  
  }, [stockCounts, selectedDate]);

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

  return (
    <div className="app">

    <Header todayText={`작업일 : ${todayText}`} />

    <div className="card">
    
      <h2>작업 날짜</h2>
    
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "18px"
        }}
      />
    
    </div>
    
    <ModeSelector
      mode={mode}
      setMode={setMode}
    />

      {mode !== "result" && (
      <div className="card">

<h2>

{mode === "order"
    ? "주문 입력"
    : "재고 입력"}

</h2>

<ProductSelector
  product={product}
  setProduct={setProduct}
/>

<TypeSelector
    types={types}
    type={type}
    setType={setType}
/>

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

    <div style={{ marginTop: "20px" }}>
      <button>
        Excel 다운로드
      </button>
    </div>

  </>

)}

  </div>
);
}

export default App;