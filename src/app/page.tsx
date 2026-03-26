"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [url, setUrl] = useState("https://example.com");
  const [color, setColor] = useState("#000000");

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Accent", value: "#E9FF7B" },
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, url || "https://example.com", {
      width: 256,
      margin: 1,
      color: { dark: color, light: "#00000000" },
      errorCorrectionLevel: "M",
    });
  }, [url, color]);

  const download = async () => {
    const dataUrl = await QRCode.toDataURL(url || "https://example.com", {
      width: 1024,
      margin: 1,
      color: { dark: color, light: "#00000000" },
      errorCorrectionLevel: "M",
    });
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>

      <div className="section">
        <label>Enter URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="section">
        <label>Color</label>
        <div className="colors">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`color-btn ${color === c.value ? "active" : ""}`}
              style={{
                backgroundColor: c.value,
                border: c.value === "#FFFFFF" ? "2px solid #e2e8f0" : undefined
              }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="preview">
        <canvas ref={canvasRef} />
      </div>

      <button onClick={download} className="download-btn">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download QR Code
      </button>
    </div>
  );
}
