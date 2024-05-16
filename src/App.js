import React, {useState} from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Modal,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import theme from "./theme";
import DescriptionSection from "./components/DescriptionSection";
import PosterSection from "./components/PosterSection";
import SocialMediaSection from "./components/SocialMediaSection";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  const [poster, setPoster] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [socialMediaText, setSocialMediaText] = useState({
    facebook: "",
    twitter: "",
    generic: "",
  });

  const [posterHtml, setPosterHtml] = useState("");

  const startGenerate = () => {
    setIsGenerating(true);
    setPosterHtml("");
  };

  const handleGenerate = ({html, facebook, twitter, instagram}) => {
    // Simulate poster and social media text generation
    setIsGenerating(false); // Set to false after generation is complete
    setPoster(html); // Replace with actual API call
    setSocialMediaText({
      facebook,
      twitter,
      generic: instagram,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" align="center" gutterBottom>
        Gishta Promotions
      </Typography>
      <CssBaseline />
      <Container className={classes.root}>
        <div className={classes.section}>
          <DescriptionSection
            onGenerate={handleGenerate}
            startGenerate={startGenerate}
          />
        </div>
        <div className={classes.section}>
          <PosterSection
            poster={poster}
            setPoster={setPoster}
            isGenerating={isGenerating}
          />
        </div>
        <div className={classes.section}>
          <SocialMediaSection
            socialMediaText={socialMediaText}
            isGenerating={isGenerating}
          />
        </div>
      </Container>
      <Modal
        open={isGenerating}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <CircularProgress className={classes.spinner} />
      </Modal>
    </ThemeProvider>
  );
}

export default App;
