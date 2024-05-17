import React, {useEffect, useState} from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Modal,
  Backdrop,
  CircularProgress,
  Icon,
} from "@material-ui/core";
import {makeStyles, ThemeProvider} from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import theme from "./theme";
import DescriptionSection from "./components/DescriptionSection";
import PosterSection from "./components/PosterSection";
import SocialMediaSection from "./components/SocialMediaSection";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    position: "relative",
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
  banner: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [poster, setPoster] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [isBackendLoading, setIsBackendLoading] = useState(true);
  const [socialMediaText, setSocialMediaText] = useState({
    facebook: "",
    twitter: "",
    generic: "",
  });

  const startGenerate = () => {
    setIsGenerating(true);
    setPoster("");
  };

  useEffect(() => {
    const checkBackendConnection = async () => {
      setIsBackendLoading(true);
      try {
         const response = await axios.get(
           `${process.env.REACT_APP_BACKEND_URL}/health`
         );

         if (response.status === 200) {
           setIsBackendConnected(true);
         } else {
           setIsBackendConnected(false);
         }
      } catch (error) {
        setIsBackendConnected(false);
      } finally {
        setIsBackendLoading(false);
      }
    };

    checkBackendConnection();
  }, []);

  const handleGenerate = ({html, facebook, twitter, instagram}) => {
    setIsGenerating(false);
    setPoster(html);
    setSocialMediaText({
      facebook,
      twitter,
      generic: instagram,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className={classes.root}>
        <Typography variant="h2" align="center" gutterBottom>
          Gishta Promotions
        </Typography>
        <div className={classes.banner}>
          {isBackendLoading ? (
            <CircularProgress size={24} className={classes.icon} />
          ) : (
            <Icon
              className={classes.icon}
              color={isBackendConnected ? "primary" : "error"}
            >
              {isBackendConnected ? <CheckCircleIcon /> : <ErrorIcon />}
            </Icon>
          )}
          <Typography variant="body1">
            {isBackendLoading
              ? "Checking backend..."
              : isBackendConnected
              ? "Backend Connected"
              : "Backend Disconnected"}
          </Typography>
        </div>
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
