import React from "react";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 400,
    width: "100%",
  },
  card: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

function PosterSection({poster, setPoster, isGenerating}) {
  const classes = useStyles();

  const handleRegenerate = () => {
    // Simulate poster regeneration
    setPoster("/path/to/regenerated-poster.jpg"); // Replace with actual API call
  };

  return (
    <div>
      <Typography variant="h5">Poster Generator</Typography>
      {!poster ? isGenerating ? (
        <Typography variant="body1">Generating poster...</Typography>
      ) : (
        <Typography variant="body1">
          Click the button to generate a poster.
        </Typography>
      ) : (
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={poster}
            title="Generated Poster"
          />
          <CardActions>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<RefreshIcon />}
              onClick={handleRegenerate}
            >
              Regenerate Poster
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

export default PosterSection;
