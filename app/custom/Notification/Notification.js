import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: 0,
  },
});

function Notification(props) {
  const { classes, close, message, open } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    close(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={() => handleClose()}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={() => handleClose()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Notification);
