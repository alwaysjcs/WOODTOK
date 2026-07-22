import { useRef } from "react";

export default function OCRImageSelector({ onImageSelect }) {
  const fileInputRef = useRef(null);

  const openPicker = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onImageSelect(file);
  };

  return (
    <div style={{ marginBottom: "15px" }}>
      <button
        onClick={openPicker}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        📷 작업지시서 선택
      </button>

      <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
      />
    </div>
  );
}