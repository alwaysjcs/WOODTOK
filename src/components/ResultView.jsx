import { PRODUCTS } from "../constants/products";
import "../styles/ResultView.css";
import productIcon from "../assets/icons/product.svg";

function ResultView({
  product,
  selectedDate,
  orderCounts,
  stockCounts
}) {

  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const displayDate = new Date(selectedDate);

  const displayDateText =
    `${displayDate.getFullYear()}. ` +
    `${displayDate.getMonth() + 1}. ` +
    `${displayDate.getDate()}(${week[displayDate.getDay()]})`;

  const colors = PRODUCTS[product].colors;

  const summary = {};

  Object.keys(PRODUCTS[product])
    .filter((key) => key !== "colors")
    .forEach((type) => {
  
      summary[type] = {
        order: 0,
        stock: 0,
        shortage: 0
      };
  
      PRODUCTS[product][type].sizes.forEach((size) => {
  
        colors.forEach((color) => {
  
          const key = `${product}_${type}_${color}`;
  
          const order = orderCounts[key]?.[size] ?? 0;
          const stock = stockCounts[key]?.[size] ?? 0;
          const shortage = Math.max(order - stock, 0);
  
          summary[type].order += order;
          summary[type].stock += stock;
          summary[type].shortage += shortage;
  
        });
  
      });
  
    });

  const renderTable = (type, size) => {
    let totalOrder = 0;
    let totalStock = 0;
    let totalShortage = 0;


    
    return (
      <div key={size} className="result-size-card">

        <div className="result-size-header">
          <span>■ {size}</span>
        </div>

        <table className="result-table">

          <thead>
            <tr>
              <th>색상</th>
              <th>주문</th>
              <th>재고</th>
              <th>부족</th>
            </tr>
          </thead>

          <tbody>

            {colors.map((color) => {

              const key = `${product}_${type}_${color}`;

              const order = orderCounts[key]?.[size] ?? 0;
              const stock = stockCounts[key]?.[size] ?? 0;
              const shortage = Math.max(order - stock, 0);

                            totalOrder += order;
              totalStock += stock;
              totalShortage += shortage;

              return (
                <tr key={color}>
                  <td>{color}</td>
                  <td>{order}</td>
                  <td>{stock}</td>
                  <td className={shortage ? "shortage" : ""}>
                    {shortage}
                  </td>
                </tr>
              );

            })}
            <tr className="result-total-row">
                <td>총계</td>
                <td>{totalOrder}</td>
                <td>{totalStock}</td>
                <td>{totalShortage}</td>
            </tr>
          </tbody>

        </table>

      </div>
    );
  };

const basic = summary["기본"] ?? {
  order: 0,
  stock: 0,
  shortage: 0
};

const dense = summary["촘촘"] ?? {
  order: 0,
  stock: 0,
  shortage: 0
};

const total = {
  order: basic.order + dense.order,
  stock: basic.stock + dense.stock,
  shortage: basic.shortage + dense.shortage
};

return (
    <div className="card">

      <h2>결과</h2>

      <div className="result-product">
         <img
             src={productIcon}
             alt=""
             className="result-product-icon"
         />
         <span>{product}</span>
      </div>

      {Object.keys(PRODUCTS[product])
        .filter((key) => key !== "colors")
        .map((type) => {

          const typeInfo = PRODUCTS[product][type];
          const sizes = typeInfo.sizes;

          if (sizes.length === 0) {
            return (
              <div key={type}>

                <div className="result-type-title">
                  {type}
                </div>

                <div className="future-message">
                  {typeInfo.message ?? "향후 정의 예정"}
                </div>

              </div>
            );
          }

          return (
            <div key={type}>

              <div className="result-type-title">
                {type}
              </div>

              {sizes.map((size) =>
                renderTable(type, size)
              )}

            </div>
          );

        })}
              <div className="summary-card">

        <h3>집계</h3>

        <table className="summary-table">

          <thead>
            <tr>
              <th>구분</th>
              <th>주문</th>
              <th>재고</th>
              <th>부족</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>기본</td>
              <td>{basic.order}</td>
              <td>{basic.stock}</td>
              <td>{basic.shortage}</td>
            </tr>

            <tr>
              <td>촘촘</td>
              <td>{dense.order}</td>
              <td>{dense.stock}</td>
              <td>{dense.shortage}</td>
            </tr>

            <tr className="summary-total">
              <td>전체</td>
              <td>{total.order}</td>
              <td>{total.stock}</td>
              <td>{total.shortage}</td>
            </tr>

          </tbody>

        </table>

      </div>
    </div>
  

  
  );
}

export default ResultView;