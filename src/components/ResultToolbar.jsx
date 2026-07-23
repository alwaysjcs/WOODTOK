import ProductSelector from "./ProductSelector";

function ResultToolbar({
    product,
    setProduct,
    showShortageOnly,
    setShowShortageOnly
}) {
    return (
    <div className="result-toolbar">

        <div className="result-toolbar-top">
    
            <ProductSelector
                product={product}
                setProduct={setProduct}
            />
    
        </div>
        <div className="shortage-filter">
            <label>
                <input
                    type="checkbox"
                    checked={showShortageOnly}
                    onChange={(e) =>
                        setShowShortageOnly(e.target.checked)
                    }
                />
                부족만 보기
            </label>
        </div>

    </div>
);
}

export default ResultToolbar;