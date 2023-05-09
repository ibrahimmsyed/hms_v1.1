import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Box, List, MenuItem, Alert, Button, Rating, Avatar, ListItem, Pagination, Typography, styled, Paper, TableRow, TableCell, TableBody, Table, DialogTitle  } from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fShortenNumber } from '../../../../utils/formatNumber';
// hooks
import { deletePresciption, deleteClinicalNotes } from '../../../../redux/slices/patient';
import { modifyInventory } from '../../../../redux/slices/setting';
import { useDispatch, useSelector } from '../../../../redux/store';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu, TableHeadCustom } from '../../../../components/table';
import { calculateAge } from '../../../../utils/utilities';
import { DialogAnimate } from '../../../../components/animate';
import AppointmentForm from '../../calendar/AppointmentForm';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

AppointmentDetailsList.propTypes = {
  appointments: PropTypes.object,
};

export default function AppointmentDetailsList({ patients, appointments, plans, prescriptions, notes, onPrint }) {
  
  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {appointments?.length > 0 && appointments.map((appointment) => (
          <AppointmentItem key={appointment.id} appointment={appointment} />
        ))}
        {plans?.length > 0 && plans.map((plan) => (
          <TreatmentPlanItem key={plan.id} plan={plan}/>
        ))}
        {prescriptions?.length > 0 && prescriptions.map((prescription, i) => (
          <PrescriptionPlanItem key={i} prescription={prescription} onPrint={onPrint}/>
        ))}
        {notes?.length > 0 && notes.map((note, i) => (
          <ClinicalNotesItem key={i} note={note} />
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

  const { patient, procedure, appointments, description, doctor, time } = appointment;
  const [openMenu, setOpenMenuActions] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState(time);
  const [selectedEvent, setSelectedEvent] = useState(appointments);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onEditRow = () => {
    setIsOpenModal(true)
  };

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

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
              src={patient?.dop}
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <div>
              <Typography variant="subtitle2" noWrap>
                {patient?.patientName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                
                {calculateAge(patient?.dob)} / {patient?.gender}
              </Typography>
            </div>
          </Box>

          <div>
            <Typography variant="h6">PROCEDURE:</Typography>
            <Typography variant="body2">{procedure}</Typography>

            <Typography variant="h6">NOTES:</Typography>
            <Typography variant="body2">{description}</Typography>

            <Box
              sx={{
                mt: 1,
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {!isHelpful && (
                <Typography variant="body2" sx={{ mr: 1 }}>
                  With <b>{doctor?.firstName} {doctor?.lastName}</b> at <b>{`${new Date(time.startTime).toDateString()} ${new Date(time.startTime).toTimeString()}`}</b>
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
      <DialogAnimate maxWidth={false}  open={isOpenModal} onClose={handleCloseModal} sx={{maxWidth: 860}}>
        <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        {selectedEvent.status === 'No Show' && 
          <Alert variant="filled" severity="warning">
            This Appointment is marked as "No-Show"
          </Alert>
        }
        <AppointmentForm isEdit={!!selectedEvent} currentAppointment={selectedEvent || null} range={selectedRange} onCancel={handleCloseModal} />
      </DialogAnimate>
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
              src={patient?.dop}
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <div>
              <Typography variant="subtitle2" noWrap>
                {patient?.patientName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                
                {patient?.dob} / {patient?.gender}
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
                  <TableCell align="left">{procedure?.procedureName}</TableCell>

                  <TableCell align="left">₹ {procedure?.cost}</TableCell>

                  <TableCell align="center">{procedure?.discount} %</TableCell>

                  <TableCell align="center">
                  ₹ {procedure?.total}
                  </TableCell>
                  <TableCell align="right">
                  {procedure?.notes}
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
                  Planned by <b>{doctor.firstName} {doctor.lastName}</b> at Estimated amount of <b>₹ {procedure.total}</b>
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

//
// -----------------------------------------------------------------------

PrescriptionPlanItem.propTypes = {
  plan: PropTypes.object,
};

function PrescriptionPlanItem({ prescription, onPrint }) {
  const dispatch = useDispatch();

  const { inventory } = useSelector((state) => state.setting);

  const [isHelpful, setHelpfuls] = useState(false);

  const { id, patient, time, drugs, doctor } = prescription;
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onDeleteRow = (id) => {
    const cart = [...inventory]
    drugs.forEach(drug => {
      cart.forEach(item => {
        if(item.id === drug.itemId && drug.count){
          const quantity = `${Number(item.quantity) + Number(drug.count)}`
          item = {...item, quantity}
          dispatch(modifyInventory(item, item.id))
        }
      })
    })
    
    dispatch(deletePresciption(id));
    console.log(id)
  };

  const TABLE_HEAD = [
    { id: 'drug', label: 'Drug', align: 'left' },
    { id: 'frequency', label: 'Frequency', align: 'left' },
    { id: 'duration', label: 'Duration', align: 'left' },
    { id: 'instruction', label: 'Instruction', align: 'center' },
  ];
  const duration = [
    {id: 1, label: 'day(s)', count: 1},
    {id: 2, label: 'week(s)', count: 7},
    {id: 3, label: 'month(s)', count: 30},
    {id: 4, label: 'year(s)', count: 365}
  ]

  const getDuration = (id) => {
    return duration.filter(item => item.id === Number(id))[0]?.label
  }

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
              src={patient?.dop}
              sx={{
                mr: { xs: 2, sm: 0 },
                mb: { sm: 2 },
                width: { md: 64 },
                height: { md: 64 },
              }}
            />
            <div>
              <Typography variant="subtitle2" noWrap>
                {patient?.patientName}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
                
                {patient?.dob} / {patient?.gender}
              </Typography>
            </div>
          </Box>

          <div style={{width:'100%'}}>
            <Table size={'medium'}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
              />
              <TableBody>
                {drugs?.map((drug) => 
                   <TableRow key={drug.id}>
                    <TableCell align="left">{drug.itemName} {drug.strength}<br/> {drug.count} Tablets</TableCell>
  
                    <TableCell align="left">{drug.morning} - {drug.noon} - {drug.night}</TableCell>
  
                    <TableCell align="center">{drug.duration} {getDuration(drug.durationUnit)}</TableCell>
  
                    <TableCell align="center">
                          {drug.instruction}
                    </TableCell>
                  </TableRow>
                )}
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
                  Prescribed  by <b>{doctor.firstName} {doctor.lastName}</b>
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
                        onDeleteRow(id);
                        handleCloseMenu();
                      }}
                  >
                    <Iconify icon={'eva:trash-2-outline'} />
                    Delete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onPrint(id);
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

// -----------------------------------------------------------------------

ClinicalNotesItem.propTypes = {
  note: PropTypes.object,
};

function ClinicalNotesItem({ note }) {
  const dispatch = useDispatch();
  const { id, patient, notes, doctor } = note;
  const [openMenu, setOpenMenuActions] = useState(null);
  const [isHelpful, setHelpfuls] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onDeleteRow = (id) => {
    dispatch(deleteClinicalNotes(id));
  };

  const onEditRow = () => {
    
  };
  const TABLE_HEAD = [
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'note', label: 'Note', align: 'left' },
  ];


  return (
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
            src={patient?.dop}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {patient?.patientName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              
              {patient?.dob} / {patient?.gender}
            </Typography>
          </div>
        </Box>

        <div style={{width:'100%'}}>
          <Table size={'medium'}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
            />
            <TableBody>
              {notes && Object.keys(notes).map(key => {
                return [...Array(notes[key].length)].map((x, i) => 
                {return notes[key]?.[i]?.title && <TableRow key={i}>
                  <TableCell align="left">{key}</TableCell>
                  <TableCell align="left">{notes[key]?.[i]?.title}</TableCell>
                </TableRow>}
                )
              })}
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
                Prescribed  by <b>{doctor.firstName} {doctor.lastName}</b>
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
                      onDeleteRow(id);
                      handleCloseMenu();
                    }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
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
  );
}