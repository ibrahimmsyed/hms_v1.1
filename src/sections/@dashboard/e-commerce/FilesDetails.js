import PropTypes from 'prop-types';
import * as Yup from 'yup';
import {groupBy, mapValues, omit} from 'lodash'; 
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import useUsers from '../../../hooks/useUsers';
import FilesList from './FilesList';
  
// ----------------------------------------------------------------------

/* const fileLists = [
  {
    id: 1,
    patient: {
      id: 32974,
      name: "Wilson",
      age: "52 Years",
      gender: "Male",
      avatarUrl: ""
    },
    files: [
      {id:1 , fileURL:'https://ray.practo.com/api/v1/files/182345982?size=medium_thumbnail'}
    ]
  }
] */

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

FilesDetails.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function FilesDetails({filesList, files, mlc}) {

  const { patients } = useUsers();
  const [ fileLists, setFileLists ] = useState([])
  const [ cloneFiles, setClonedFiles ] = useState(files) 
  const [ mlcLists, setMLCLists ] = useState([])
  const [ showMLC, setShowMLC ] = useState()

  const toggleMLC = () => {
    setShowMLC(true)
  }
  
  const TAG = [
    {id: 0, label: 'Untagged'},
    {id: 1, label: 'Procedure Pending'},
    {id: 2, label: 'Pending'},
    {id: 3, label: 'Remove'},
  ]

  useEffect(()=>{
    const grouped = groupBy(cloneFiles, 'patientId');
    setFileLists(grouped)
  }, [cloneFiles])

  useEffect(()=>{
    const groupedMLC = groupBy(mlc, 'patientId');
    setMLCLists(groupedMLC)
    console.log(mlc)
  }, [mlc])

/*   useEffect(()=>{
    const grouped = groupBy(cloneFiles.files, 'patientId');
    const groupedMLC = groupBy(cloneFiles.medicalCertificate, 'patientId');
    console.log(grouped)
    setMLCLists(groupedMLC)
    setFileLists(grouped)
  }, [cloneFiles]) */

  const getPatientsDetails = (id) => {
    return patients.filter(patient => Number(patient.id) === Number(id))[0]
  }

  const filterFilesByTag = (tag) => {
    setShowMLC(false)
    const cloned = filesList
    let filteredFiles = {}
    if(tag !== "All"){
      filteredFiles = cloned.filter(file => file.tags === tag);
    }else{
      filteredFiles = files
    }
    setClonedFiles(filteredFiles)
    console.log(filteredFiles, tag)
  }

  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <MenuList>
              <MenuItem onClick={()=> {filterFilesByTag('All')}}>
                <ListItemText>All Files</ListItemText>
              </MenuItem>
              <MenuList sx={{ pl: 2 }}>
                {TAG.map((option) => (
                  <MenuItem key={option.id} onClick={()=> {filterFilesByTag(option.label)}}>
                    <ListItemText>{option.label}</ListItemText>
                  </MenuItem>
                ))}
              </MenuList>
              <Divider />
              <MenuItem onClick={() => toggleMLC()}> 
                <ListItemText>Medical Leave Certificate</ListItemText>
              </MenuItem>
            </MenuList>
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3} alignItems="flex-end">
            {!showMLC && Object.keys(fileLists).map((key, i) => 
              <FilesList key={i} patient={getPatientsDetails(key)} fileLists={fileLists[key]}/>
            )}
            {showMLC && Object.keys(mlcLists).map((key, i)=> 
              <FilesList key={i} patient={getPatientsDetails(key)} mlcLists={mlcLists[key]}/>
            )}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
