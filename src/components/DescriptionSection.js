import React, {useState} from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  Grid,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MicIcon from "@material-ui/icons/Mic";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CloseIcon from "@material-ui/icons/Close";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

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
}));

function DescriptionSection({onGenerate}) {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && mediaFiles.length < 3) {
      setMediaFiles([...mediaFiles, file]);
    }
  };

  const handleRemoveFile = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleGenerateClick = () => {
    const audioFile = mediaFiles.find((file) => file.type.startsWith("audio"));
    const videoFile = mediaFiles.find((file) => file.type.startsWith("video"));
    onGenerate(
      description,
      audioFile ? URL.createObjectURL(audioFile) : null,
      videoFile ? URL.createObjectURL(videoFile) : null
    );
  };

  return (
    <div>
      <Typography variant="h5">Capture Narratives</Typography>
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
              <IconButton>
                <MicIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container spacing={1}>
        {mediaFiles.map((file, index) => (
          <Grid item key={index} className={classes.thumbnailContainer}>
            {file.type.startsWith("image") && (
              <Avatar
                src={URL.createObjectURL(file)}
                className={classes.thumbnail}
                variant="rounded"
              />
            )}
            {file.type.startsWith("audio") && (
              <AudioPlayer
                src={URL.createObjectURL(file)}
                controls
                className={classes.audioPlayer}
              />
            )}
            {file.type.startsWith("video") && (
              <video
                src={URL.createObjectURL(file)}
                className={classes.thumbnail}
                controls
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
        disabled={mediaFiles.length === 0}
      >
        Generate
      </Button>
    </div>
  );
}

export default DescriptionSection;
