import PropTypes from 'prop-types';
// Routes
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import { paramCase } from 'change-case';
import { useSnackbar } from 'notistack';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Link, Tooltip, IconButton } from '@mui/material';
//
import { useDispatch, useSelector } from '../../../../redux/store';
import { deletePatientsDetail } from '../../../../redux/slices/patient';
// utils
import cssStyles from '../../../../utils/cssStyles';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import SocialsButton from '../../../../components/SocialsButton';
import SvgIconStyle from '../../../../components/SvgIconStyle';
import Iconify from '../../../../components/Iconify';
import ConfirmationDialog from '../../../../components/ConfirmationDialog';
//  Routes
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

PatientCard.propTypes = {
  patient: PropTypes.object.isRequired,
  isSearch: PropTypes.bool
};

export default function PatientCard({ patient, isSearch, url }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { patientName, id, primaryMobNo, gender, dop, cover } = patient;
  const redirectLink = isSearch ? `${PATH_DASHBOARD[url].new(id, patientName)}` : `${PATH_DASHBOARD.patient.edit(id, patientName)}`
  const [openDialog, setOpenDialog] = useState(false)
  const [value, setValue] = useState('')
  const handleDeleteRows = (id) => {
    setOpenDialog(true)
    setValue(patientName)
  };
  const handleDeleteRow = () => {
    dispatch(deletePatientsDetail(id));
    setOpenDialog(false)
    enqueueSnackbar('delete success!');
  };
  const handleClose = () => {
    setOpenDialog(false)
  };
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={patientName}
          src={dop}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <OverlayStyle />
        <Image src={cover} alt={cover} ratio="16/9" />
        {!isSearch && <Tooltip title="Delete" sx={{
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: '9',
              color: '#FFF'
            }}>
          <IconButton color="primary" onClick={() => handleDeleteRows(id)}>
            <Iconify icon={'eva:trash-2-outline'} />
          </IconButton>
        </Tooltip>}
      </Box>
      <Link to={redirectLink} color="inherit" component={RouterLink}>
        <Typography variant="subtitle1" sx={{ mt: 6 }}>
          {patientName}
        </Typography>
      </Link>

      <Box sx={{ py: 3, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Gender
          </Typography>
          <Typography variant="subtitle1">{gender}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Contact No.
          </Typography>
          <Typography variant="subtitle1">{primaryMobNo}</Typography>
        </div>
      </Box>
      <ConfirmationDialog openDialog={openDialog} value={value} handleDeleteRow={handleDeleteRow} handleClose={handleClose}/>
    </Card>
  );
}
