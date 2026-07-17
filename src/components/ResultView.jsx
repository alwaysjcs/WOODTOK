import { PRODUCTS } from "../constants/products";
import "../styles/ResultView.css";

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

  const renderTable = (type, size) => {
    return (
      <div key={size} className="result-size-card">

        <div className="result-size-header">
          <span>{size}</span>
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

          </tbody>

        </table>

      </div>
    );
  };

  return (
    <div className="card">

      <h2>결과</h2>

      <div className="result-date">
         작업일 : {displayDateText}
      </div>

      <div className="result-product">
        {product}
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
    </div>
  );
}

export default ResultView;