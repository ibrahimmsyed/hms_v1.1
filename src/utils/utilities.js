/* eslint-disable */
// ----------------------------------------------------------------------
import moment from 'moment'

export function calculateAge(dob) {
    return moment().diff(moment('20120507', 'YYYYMMDD'), 'years');
}

export function mediaURL(path) {
    return `http://127.0.0.1:8000${path}`;
}

  