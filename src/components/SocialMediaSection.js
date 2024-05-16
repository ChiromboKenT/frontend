import React, {useState} from "react";
import {Typography, Tabs, Tab, Box, Paper, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import CopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  tabContent: {
    padding: theme.spacing(2),
  },
  socialPost: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
  },
  socialIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  button: {
    marginLeft: "auto",
  },
}));

function SocialMediaSection({socialMediaText, isGenerating}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <Typography variant="h5">Social Media Post</Typography>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab label="Facebook" icon={<FacebookIcon />} />
        <Tab label="Twitter" icon={<TwitterIcon />} />
        <Tab label="Generic" />
      </Tabs>
      <Box className={classes.tabContent}>
        {value === 0 && (
          <Paper className={classes.socialPost}>
            <FacebookIcon className={classes.socialIcon} />
            <Typography variant="body1">{socialMediaText.facebook}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() => handleCopy(socialMediaText.facebook)}
            >
              Copy
            </Button>
          </Paper>
        )}
        {value === 1 && (
          <Paper className={classes.socialPost}>
            <TwitterIcon className={classes.socialIcon} />
            <Typography variant="body1">{socialMediaText.twitter}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() => handleCopy(socialMediaText.twitter)}
            >
              Copy
            </Button>
          </Paper>
        )}
        {value === 2 && (
          <Paper className={classes.socialPost}>
            <Typography variant="body1">{socialMediaText.generic}</Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() => handleCopy(socialMediaText.generic)}
            >
              Copy
            </Button>
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default SocialMediaSection;
