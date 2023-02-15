import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper, TextField, Stack, Box  } from '@mui/material';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SearchNotFound from '../../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function PatientSearch({selectedPatient}) {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [value, setValue] = useState();

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            },
            params: { search: value }
        }
        const response = await axios.get('http://localhost:8000/patientdetails/', headers);

        if (isMountedRef.current) {
          setSearchResults(response.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (name) => {
    navigate(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

  return (
    <Stack spacing={2}>
      <Autocomplete
        value={value}
        freeSolo
        id="free-solo-2-demo"
        onInputChange={(event, value) => handleChangeSearch(value)}
        disableClearable
        // options={searchResults.map((option) => option.patientName)}
        getOptionLabel={(option) => option.patientName}
        options={searchResults}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {option.patientName}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Patient Name"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        onChange={(event, newValue) => {
          setValue(newValue);
          selectedPatient(newValue)
          console.log(JSON.stringify(newValue, null, ' '));
        }}
      />
    </Stack>
  );
}
