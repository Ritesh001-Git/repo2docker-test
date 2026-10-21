import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const [message, setMessage] = useState("Click the button to test the backend.");
  const [status, setStatus] = useState("Not tested");

  async function testBackend() {
    setStatus("Checking...");
    try {
      const response = await fetch("/api/message");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setMessage(data.message);
      setStatus("Connected");
    } catch (error) {
      setMessage(`Could not reach backend: ${error.message}`);
      setStatus("Failed");
    }
  }

  return (
    <main className="page">
      <section className="panel">
        <p className="eyebrow">Repo2Docker pipeline test</p>
        <h1>Sample Web App</h1>
        <p className="intro">A small React frontend connected to a FastAPI backend.</p>
        <div className={`status ${status === "Connected" ? "success" : ""}`}>
          Backend status: <strong>{status}</strong>
        </div>
        <div className="message">{message}</div>
        <button onClick={testBackend}>Test backend connection</button>
        <p className="footnote">Frontend container: Nginx · Backend container: FastAPI</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
