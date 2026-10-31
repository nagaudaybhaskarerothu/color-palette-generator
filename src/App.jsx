
import { useState } from 'react';
import './App.css';

function App() {
  const [colors, setColors] = useState([
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F1C40F",
  ]);

  const [copiedColor, setCopiedColor] = useState("");

  const generateColors = () => {
    const newColors = Array.from({ length: 4 }, () =>
      "#" + Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );

    setColors(newColors);
    setCopiedColor("");
  };

  const copyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);

      setTimeout(() => {
        setCopiedColor("");
      }, 1500);
    } catch {
      alert("Unable to copy color. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>Color Palette Generator</h1>
      <p className="subtitle">
        Create beautiful color palettes in one click.
      </p>

      <div className="palette-container">
        {colors.map((color, index) => (
          <div className="color-card" key={index}>
            <div
              className="color-box"
              style={{ backgroundColor: color }}
            ></div>

            <div className="color-info">
              <p className="color-code">{color}</p>

              <button
                className="copy-button"
                onClick={() => copyColor(color)}
              >
                {copiedColor === color ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="generate-button" onClick={generateColors}>
        Generate New Palette
      </button>
    </div>
  );
}

export default App;