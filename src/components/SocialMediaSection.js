import React, {useState} from "react";
import {Typography, Tabs, Tab, Box, Paper, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import CopyIcon from "@material-ui/icons/FileCopy";
import { Instagram } from '@material-ui/icons';

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
  socialContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(1),
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
            <div className={classes.socialContainer}>
              <Typography variant="h4">
                {socialMediaText.facebook?.title}
              </Typography>
              <Typography variant="body1">
                {socialMediaText.facebook?.description}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() =>
                handleCopy(
                  socialMediaText.facebook?.title +
                    " " +
                    socialMediaText.facebook?.description
                )
              }
            >
              Copy
            </Button>
          </Paper>
        )}
        {value === 1 && (
          <Paper className={classes.socialPost}>
            <TwitterIcon className={classes.socialIcon} />
            <div className={classes.socialContainer}>


            <Typography variant="h4">
              {socialMediaText.twitter?.title}
            </Typography>
            <Typography variant="body1">
              {socialMediaText.twitter?.description}
            </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() => handleCopy(socialMediaText.twitter?.title)}
            >
              Copy
            </Button>
          </Paper>
        )}
        {value === 2 && (
          <Paper className={classes.socialPost}>
            <Instagram className={classes.socialIcon} />
            <div className={classes.socialContainer}>

            <Typography variant="h4">
              {socialMediaText.instagram?.title}
            </Typography>
            <Typography variant="body1">
              {socialMediaText.facebook?.description}
            </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CopyIcon />}
              className={classes.button}
              onClick={() => handleCopy(socialMediaText.instagram?.title)}
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
