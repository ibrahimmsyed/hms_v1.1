import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  calendarEvents: [],
  events: [],
  isOpenModal: false,
  selectedEventId: null,
  selectedRange: null,
};

const slice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setCalendarEvent(state, action) {
      state.isLoading = false;
      state.calendarEvents = action.payload;
    },

    updateCalendarEvents(state, action) {
      state.isLoading = false;
      state.calendarEvents = [...state.calendarEvents, action.payload]
    },

    removeCalendarEvents(state, action) {
      state.isLoading = false;
      state.calendarEvents = state.calendarEvents.filter(plan => plan.id !== action.payload)
    },

    // GET EVENTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // CREATE EVENT
    createEventSuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.events = [...state.events, newEvent];
    },

    // UPDATE EVENT
    updateEventSuccess(state, action) {
      const event = action.payload;
      const updateEvent = state.events.map((_event) => {
        if (_event.id === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.events = updateEvent;
    },

    // DELETE EVENT
    deleteEventSuccess(state, action) {
      const { eventId } = action.payload;
      const deleteEvent = state.events.filter((event) => event.id !== eventId);
      state.events = deleteEvent;
    },

    // SELECT EVENT
    selectEvent(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedEventId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
      state.selectedEventId = null;
      state.selectedRange = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectEvent } = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/calendar/events');
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createEvent(newEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/new', newEvent);
      dispatch(slice.actions.createEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateEvent(eventId, updateEvent) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        eventId,
        updateEvent,
      });
      dispatch(slice.actions.updateEventSuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEvent(eventId) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.post('/api/calendar/events/delete', { eventId });
      dispatch(slice.actions.deleteEventSuccess({ eventId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start, end) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start,
        end,
      })
    );
  };
}

// -------------------

/** ******************************************************** */

export function getCalendarEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get('http://localhost:8000/eventcalendar/', headers);
      dispatch(slice.actions.setCalendarEvent(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCalendarEvents(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post('http://localhost:8000/eventcalendar/', plan, headers);
      dispatch(slice.actions.updateCalendarEvents(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteCalendarEvents(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/eventcalendar/${id}/`, headers);
      dispatch(slice.actions.removeCalendarEvents(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}