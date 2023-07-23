import FullCalendar, { eventTupleToStore } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
//
import { useState, useRef, useEffect } from 'react';
// @mui
import { Card, Button, Container, DialogTitle, Alert, InputLabel, MenuItem, Select, FormControl, Stack, Box } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCalendarEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from '../../redux/slices/calendar';
import { getPatientsDetails, getProcedure } from '../../redux/slices/patient';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';
import useUsers from '../../hooks/useUsers';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { DialogAnimate } from '../../components/animate';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CalendarStyle, CalendarToolbar, AppointmentForm } from '../../sections/@dashboard/calendar';

// ----------------------------------------------------------------------



const selectedEventSelector = (state) => {
  const { calendarEvents: events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    let appointment = events.find((_event) => _event.id === Number(selectedEventId));
    if(appointment.eventType === 'appointment'){
      appointment = {...appointment, tags: appointment.tags.split(',')}
    }
    return appointment
  }
  return null;
};

export default function Calendar() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { user: staffList } = useUsers();

  const [staff, setStaff] = useState('all')

  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    const staff =  staffList.filter(user => user.isStaff)
    if(staff.length){
      setStaffs(staff)
    }
  },[staffList])

  const defaultRange = {
    start: new Date(),
    end: new Date()
  }

  const isDesktop = useResponsive('up', 'sm');

  const calendarRef = useRef(null);

  const [date, setDate] = useState(new Date());

  const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');

  const [events, setEvents] = useState([]);

  const selectedEvent = useSelector(selectedEventSelector);

  const { calendarEvents, isOpenModal, selectedRange } = useSelector((state) => state.calendar);
  const { patients } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getCalendarEvents());
    dispatch(getPatientsDetails());
    dispatch(getProcedure());
  }, [dispatch]);

  useEffect(() => {
    if(calendarEvents.length)
    handleEvent(calendarEvents)
  }, [calendarEvents])

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isDesktop ? 'dayGridMonth' : 'listWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isDesktop]);

  const handleEvent = (calendarEvents) => {
    let cloneCalendarEvents = [...calendarEvents]
    let title = ''; let borderColor = ''
    cloneCalendarEvents = cloneCalendarEvents.map(events => {
      switch (events.eventType){
        case 'block':
          title = events.leaveDetails;
          break;
        case 'reminder':
          title = events.reminderTitle;
          break;
        default:
          title = events.patientName;
          break;
      }
      switch (events.status){
        case 'No Show':
          borderColor = 'red';
          break;
        case 'Invoiced':
          borderColor = 'green';
          break;
        default:
          borderColor = '';
          break;
      }
      return {...events, title, borderColor}
    })
    setEvents(cloneCalendarEvents)
  }

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleSelectRange = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
  };

  const handleSelectEvent = (arg) => {
    dispatch(selectEvent(arg.event.id));
  };

  const handleResizeEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event }) => {
    try {
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    setStaff(e.target.value)
    const events = [...calendarEvents]
    console.log(events)
    handleEvent(events.filter(event => Number(event.doctor) === e.target.value))
  };

  return (
    <Page title="Calendar">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Calendar"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Calendar' }]}
          action={
            <Box
              sx={{
                p:5,
                display: 'grid',
                columnGap: 1,
                rowGap: 1,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Doctor</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={staff}
                  label="Staff"
                  onChange={handleChange}
                >
                    <MenuItem value='all'>All</MenuItem>
                  {staffs?.length && staffs.map((staff) =>(
                    <MenuItem key={staff.id} value={staff.id}>{staff.firstName} {staff.lastName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
                onClick={handleAddEvent}
              >
                New Event
              </Button>
            </Box>
          }
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={events}
              /* events={[
                { title: 'event 1', date: '2022-12-01', textColor: '#1890FF' },
                { title: 'event 2', date: '2022-12-30', allDay: true, textColor: '#7A0C2E' }
              ]} */
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              allDayMaintainDuration
              eventResizableFromStart
              select={handleSelectRange}
              eventDrop={handleDropEvent}
              eventClick={handleSelectEvent}
              eventResize={handleResizeEvent}
              height={isDesktop ? 720 : 'auto'}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </CalendarStyle>
        </Card>

        <DialogAnimate maxWidth={false}  open={isOpenModal} onClose={handleCloseModal} sx={{maxWidth: 860}}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          {selectedEvent?.status === 'No Show' && 
            <Alert variant="filled" severity="warning">
              This Appointment is marked as "No-Show"
            </Alert>
          }
          <AppointmentForm isEdit={!!selectedEvent} currentAppointment={selectedEvent || null} range={selectedRange || defaultRange} onCancel={handleCloseModal} />
        </DialogAnimate>
      </Container>
    </Page>
  );
}
