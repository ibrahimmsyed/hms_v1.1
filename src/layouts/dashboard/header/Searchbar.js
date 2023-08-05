import { useState } from 'react';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Input, Slide, Button, InputAdornment, ClickAwayListener, Box, IconButton } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/Iconify';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { IconButtonAnimate } from '../../../components/animate';
import { PatientSearch } from '../../../sections/@dashboard/user/profile'

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  ...cssStyles(theme).bgBlur(),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const navigate = useNavigate();
  
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const selectedPatient = (selected) => {
    navigate(PATH_DASHBOARD.patient.selected( 'profile', selected.id));
    // setSelectedPatientId(selected.id)
    console.log(selected)
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <IconButtonAnimate onClick={handleOpen}>
            <Iconify icon={'eva:search-fill'} width={20} height={20} />
          </IconButtonAnimate>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
          <Box
              sx={{
                display: 'block', width: '50%' , m: '24px auto'
              }}
            >
            <PatientSearch selectedPatient={selectedPatient}/>
          </Box>
            {/* <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Iconify
                    icon={'eva:search-fill'}
                    sx={{ color: 'text.disabled', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button variant="contained" onClick={handleClose}>
              Search
            </Button> */}
            <IconButton
                size="small"
                onClick={() => handleClose()}
                sx={{
                  p: '2px',
                  color: 'common.white',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                  },
                }}
              >
                <Iconify icon={'eva:close-fill'} />
            </IconButton>
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
