// src/components/AudioRecorder.js
import React, {useState, useRef, useEffect} from "react";
import {ReactMic} from "react-mic";
import AudioVisualizer from "./AudioVisualizer";
import "./AudioRecorder.css";

function AudioRecorder() {
  const [record, setRecord] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (record) {
      startVisualizer();
    } else {
      stopVisualizer();
    }
  }, [record]);

  const startVisualizer = () => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyserNode = audioContextRef.current.createAnalyser();
    navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserNode);
      setAnalyser(analyserNode);
    });
  };

  const stopVisualizer = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startRecording = () => setRecord(true);
  const stopRecording = () => setRecord(false);

  return (
    <div className="audio-recorder">
      <div className="visualizer-container">
        {record && <AudioVisualizer analyser={analyser} />}
      </div>
      <ReactMic
        record={record}
        className="sound-wave"
        onStop={(recordedBlob) => console.log(recordedBlob)}
        strokeColor="#00ff00"
        backgroundColor="#000000"
        visualSetting={undefined}
      />
      <div className="button-container">
        {record ? (
          <button onClick={stopRecording} className="record-button">
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} className="record-button">
            Start Recording
          </button>
        )}
      </div>
    </div>
  );
}

export default AudioRecorder;
