import React from "react";
import {Container, Typography, CssBaseline} from "@material-ui/core";
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
}));

function App() {
  const classes = useStyles();
  const [poster, setPoster] = React.useState(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [socialMediaText, setSocialMediaText] = React.useState({
    facebook: "",
    twitter: "",
    generic: "",
  });

  const handleGenerate = (description, audioUrl, videoUrl) => {
    // Simulate poster and social media text generation
    setIsGenerating(true);
    setPoster("/path/to/generated-poster.jpg"); // Replace with actual API call
    setSocialMediaText({
      facebook: "Generated Facebook post text",
      twitter: "Generated Twitter post text",
      generic: "Generated generic post text",
    });
    setIsGenerating(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h2" align="center" gutterBottom>
        Gishta Promotions
      </Typography>
      <CssBaseline />
      <Container className={classes.root}>
        <div className={classes.section}>
          <DescriptionSection onGenerate={handleGenerate} />
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
    </ThemeProvider>
  );
}

export default App;
