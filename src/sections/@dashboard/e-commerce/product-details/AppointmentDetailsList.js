import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, List, MenuItem, Button, Rating, Avatar, ListItem, Pagination, Typography, styled, Paper, TableRow, TableCell, TableBody, Table  } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

AppointmentDetailsList.propTypes = {
  appointments: PropTypes.object,
};

export default function AppointmentDetailsList({ appointments, plans }) {
  
  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {appointments?.length > 0 && appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
        {plans?.length > 0 && plans.map((plan) => (
          <TreatmentPlanItem key={plan.id} plan={plan}/>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

AppointmentItem.propTypes = {
  appointment: PropTypes.object,
};

function AppointmentItem({ appointment }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const { patient, procedure, notes, doctor, time } = appointment;
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onEditRow = () => {
    
  };

  return (
    <>
      <Item key={4} elevation={4}>
        <ListItem
          disableGutters
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, sm: 0 },
              minWidth: { xs: 160, md: 240 },
              textAlign: { sm: 'center' },
              flexDirection: { sm: 'column' },
            }}
          >
            <Avatar
              src={patient.avatarUrl}
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <div>
              <Typography variant="subtitle2" noWrap>
                {patient.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                
                {patient.age} / {patient.gender}
              </Typography>
            </div>
          </Box>

          <div>
            <Typography variant="h6">PROCEDURE:</Typography>
            <Typography variant="body2">{procedure.name}</Typography>

            <Typography variant="h6">NOTES:</Typography>
            <Typography variant="body2">{notes.description}</Typography>

            <Box
              sx={{
                mt: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {!isHelpful && (
                <Typography variant="body2" sx={{ mr: 1 }}>
                  With <b>{doctor.name}</b> at <b>{time.startTime}</b>
                </Typography>
              )}
            </Box>
          </div>
          <Box sx={{
                ml: 'auto'
              }}>
            <TableMoreMenu
              sx={{marginLeft: 'auto'}}
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                <>
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                    Edit
                  </MenuItem>
                </>
              }
            />
          </Box>
        </ListItem>
      </Item>
    </>
  );
}


// -----------------------------------------------------------------------

TreatmentPlanItem.propTypes = {
  plan: PropTypes.object,
};

function TreatmentPlanItem({ plan }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const { patient, procedure, doctor } = plan;
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onEditRow = () => {
    
  };
  const TABLE_HEAD = [
    { id: 'procedure', label: 'Procedure', align: 'left' },
    { id: 'cost', label: 'Cost', align: 'left' },
    { id: 'discount', label: 'Discount', align: 'left' },
    { id: 'total', label: 'Total', align: 'center' },
    { id: 'notes', label: 'Notes', align: 'left' },
    { id: '' },
  ];

  return (
    <>
      <Item key={4} elevation={4}>
        <ListItem
          disableGutters
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Box
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              mb: { xs: 2, sm: 0 },
              minWidth: { xs: 160, md: 240 },
              textAlign: { sm: 'center' },
              flexDirection: { sm: 'column' },
            }}
          >
            <Avatar
              src={patient.avatarUrl}
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <div>
              <Typography variant="subtitle2" noWrap>
                {patient.name}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                
                {patient.age} / {patient.gender}
              </Typography>
            </div>
          </Box>

          <div style={{width:'100%'}}>
            <Table size={'medium'}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
              />
              <TableBody>
                <TableRow>
                  <TableCell align="left">{procedure.name}</TableCell>

                  <TableCell align="left">₹ {procedure.cost}</TableCell>

                  <TableCell align="center">{procedure.discount} %</TableCell>

                  <TableCell align="center">
                  ₹ {procedure.total}
                  </TableCell>
                  <TableCell align="right">
                  {procedure.notes}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Box
              sx={{
                mt: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {!isHelpful && (
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Planned by <b>{doctor.name}</b> at Estimated amount of <b>{procedure.estimatedAmount}</b>
                </Typography>
              )}
            </Box>
          </div>
          <Box sx={{
                ml: 'auto'
              }}>
            <TableMoreMenu
              sx={{marginLeft: 'auto'}}
              open={openMenu}
              onOpen={handleOpenMenu}
              onClose={handleCloseMenu}
              actions={
                <>
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:printer-fill'} />
                    Print
                  </MenuItem>
                </>
              }
            />
          </Box>
        </ListItem>
      </Item>
    </>
  );
}