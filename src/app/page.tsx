"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<any>(null);
  const [url, setUrl] = useState("https://example.com");
  const [color, setColor] = useState("#000000");
  const [ready, setReady] = useState(false);

  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Accent", value: "#E9FF7B" },
  ];

  useEffect(() => {
    const load = async () => {
      const QRCodeStyling = (await import("qr-code-styling")).default;

      qrInstance.current = new QRCodeStyling({
        width: 280,
        height: 280,
        data: url,
        dotsOptions: {
          color: color,
          type: "dots",
        },
        cornersSquareOptions: {
          color: color,
          type: "extra-rounded",
        },
        cornersDotOptions: {
          color: color,
          type: "dot",
        },
        backgroundOptions: {
          color: "transparent",
        },
        qrOptions: {
          errorCorrectionLevel: "M",
        },
      });

      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrInstance.current.append(qrRef.current);
      }
      setReady(true);
    };
    load();
  }, []);

  useEffect(() => {
    if (qrInstance.current && ready) {
      qrInstance.current.update({
        data: url || "https://example.com",
        dotsOptions: { color: color, type: "dots" },
        cornersSquareOptions: { color: color, type: "extra-rounded" },
        cornersDotOptions: { color: color, type: "dot" },
      });
    }
  }, [url, color, ready]);

  const download = async () => {
    const QRCodeStyling = (await import("qr-code-styling")).default;
    const qr = new QRCodeStyling({
      width: 1024,
      height: 1024,
      data: url || "https://example.com",
      dotsOptions: { color: color, type: "dots" },
      cornersSquareOptions: { color: color, type: "extra-rounded" },
      cornersDotOptions: { color: color, type: "dot" },
      backgroundOptions: { color: "transparent" },
      qrOptions: { errorCorrectionLevel: "M" },
    });
    qr.download({ name: "qrcode", extension: "png" });
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
        <div ref={qrRef} />
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
