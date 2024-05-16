// src/components/AudioVisualizer.js
import React, {useEffect, useRef} from "react";
import "./AudioVisualizer.css";

const AudioVisualizer = ({analyser}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!analyser) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // **Set canvas dimensions to be equal (square)**
    const size = Math.min(canvas.width, canvas.height); // Use the smaller dimension
    canvas.width = size;
    canvas.height = size;

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // **Center the circle**
      const radius = size / 4;
      const centerX = size / 2;
      const centerY = size / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < bufferLength; i++) {
        const value = dataArray[i];
        const angle = (i / bufferLength) * 2 * Math.PI;
        const x1 = centerX + radius * Math.cos(angle);
        const y1 = centerY + radius * Math.sin(angle);
        const x2 = centerX + (radius + value / 2) * Math.cos(angle);
        const y2 = centerY + (radius + value / 2) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    draw();
  }, [analyser]);

  return <canvas ref={canvasRef} className="visualizer-canvas" />;
};

export default AudioVisualizer;
