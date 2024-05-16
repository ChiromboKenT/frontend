import React, {useState, useEffect, useRef} from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import AudioPlayer from "react-h5-audio-player";
import {ReactMic} from "react-mic";
import "react-h5-audio-player/lib/styles.css";
import AudioVisualizer from "./AudioVisualizer";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  mediaInput: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  thumbnailContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
    position: "relative",
  },
  thumbnail: {
    width: 50,
    height: 50,
    objectFit: "cover",
    borderRadius: "50%",
    marginRight: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "white",
    color: "red",
  },
  audioPlayer: {
    marginTop: theme.spacing(2),
  },
  visualizer: {
    width: "100%",
    marginTop: theme.spacing(2),
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function DescriptionSection({onGenerate, startGenerate}) {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const audioContextRef = useRef(null);
  const [analyser, setAnalyser] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [srcLang, setSrcLang] = useState("en");
  const [destLang, setDestLang] = useState("en");

  useEffect(() => {
    if (isRecording) {
      startVisualizer();
    } else {
      stopVisualizer();
    }
  }, [isRecording]);

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
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && mediaFiles.length < 3) {
      setMediaFiles([...mediaFiles, file]);
    }
  };

  const handleRemoveFile = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleGenerateClick = async () => {
    startGenerate();
    const audioFile = mediaFiles.find(
      (file) => file.type && file.type.startsWith("audio")
    );
    const formData = new FormData();
    formData.append("text", description);
    formData.append("src_lang", srcLang);
    formData.append("dest_lang", destLang);
    if (audioFile) {
      formData.append("audio", audioFile);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/generate-full-poster`,
        {
          method: "POST",
          body: formData,
        }
      );
      const { poster_html, social } = await response.json();
      const html = await poster_html.text();
      const {facebook, twitter, instagram} = social;
      onGenerate({
        html,
        facebook,
        twitter,
        instagram,
      });
    } catch (error) {
      console.error("Error generating poster:", error);
    }
  };

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  const handleStopRecording = (recordedBlob) => {
    const file = new File([recordedBlob.blob], "recording.wav", {
      type: "audio/wav",
    });
    setMediaFiles([...mediaFiles, file]);
    setIsRecording(false);
  };

  return (
    <div>
      <Typography variant="h5">Capture Narratives</Typography>
      <Typography variant="body1" style={{marginBottom: 16}}>
        Provide a detailed description of the festival/concert/event. You can
        also record audio or upload images and videos to enhance your narrative.
        Make sure to give a comprehensive and vivid description to generate
        detailed promotional materials.
      </Typography>
      <div className={classes.visualizer}>
        {isRecording && <AudioVisualizer analyser={analyser} />}
      </div>
      <ReactMic
        record={isRecording}
        className="sound-wave"
        onStop={handleStopRecording}
        strokeColor="#000000"
        backgroundColor="#f0f0f0"
        visualSetting={undefined}
        noiseSuppression={true}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="source-lang-label">Source Language</InputLabel>
        <Select
          labelId="source-lang-label"
          value={srcLang}
          onChange={(e) => setSrcLang(e.target.value)}
          label="Source Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="yo">Yoruba</MenuItem>
          <MenuItem value="fon">Fon</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="dest-lang-label">Destination Language</InputLabel>
        <Select
          labelId="dest-lang-label"
          value={destLang}
          onChange={(e) => setDestLang(e.target.value)}
          label="Destination Language"
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="yo">Yoruba</MenuItem>
          <MenuItem value="fon">Fon</MenuItem>
          <MenuItem value="fr">French</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Add a description"
        fullWidth
        margin="normal"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <input
                accept="image/*,audio/*,video/*"
                style={{display: "none"}}
                id="upload-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="upload-file">
                <IconButton component="span">
                  <AttachFileIcon />
                </IconButton>
              </label>
              <IconButton onClick={handleRecordClick}>
                {isRecording ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={1}>
        {mediaFiles.map((file, index) => (
          <Grid item key={index} className={classes.thumbnailContainer}>
            {file.type && file.type.startsWith("image") && (
              <Avatar
                src={URL.createObjectURL(file)}
                className={classes.thumbnail}
                variant="rounded"
              />
            )}
            {file.type && file.type.startsWith("audio") && (
              <AudioPlayer
                src={URL.createObjectURL(file)}
                controls
                className={classes.audioPlayer}
              />
            )}
            {file.type && file.type.startsWith("video") && (
              <video
                src={URL.createObjectURL(file)}
                className={classes.thumbnail}
                controls
              />
            )}
            {!file.type && (
              <AudioPlayer
                src={URL.createObjectURL(file)}
                controls
                className={classes.audioPlayer}
              />
            )}
            <IconButton
              size="small"
              className={classes.closeButton}
              onClick={() => handleRemoveFile(index)}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleGenerateClick}
        disabled={mediaFiles.length === 0 && description.length === 0}
      >
        Generate
      </Button>
    </div>
  );
}

export default DescriptionSection;
