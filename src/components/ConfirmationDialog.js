import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// @mui
import { Tooltip, Typography, TextField, IconButton, InputAdornment, Button, DialogActions } from '@mui/material';
//
import Iconify from './Iconify';
import { DialogAnimate } from './animate';
// ----------------------------------------------------------------------

ConfirmationDialog.propTypes = {
  value: PropTypes.string,
};

export default function ConfirmationDialog({ openDialog, value, handleDeleteRow, handleClose, ...other }) {

  const [isOpen, setDialog] = useState(openDialog);

  useEffect(()=> {
    setDialog(openDialog)
  }, [openDialog])


  
  return (
    <DialogAnimate maxWidth={false}  open={isOpen} sx={{maxWidth: 860}}>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
          You are deleting the {value}. Once deleted you can't retrieve.
          Please confirm.
        </Typography>
        <Button onClick={handleDeleteRow} variant="contained">Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>          
    </DialogAnimate>
  );
}
