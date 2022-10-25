import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
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
import FilesList from './FilesList';
// ----------------------------------------------------------------------

const fileLists = [
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
]

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

export default function FilesDetails() {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <MenuList>
              <MenuItem>
                <ListItemText>All Files</ListItemText>
              </MenuItem>
              <MenuList sx={{ pl: 2 }}>
                <MenuItem>
                  <ListItemText>Procedure Pending</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Pending</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>Remove</ListItemText>
                </MenuItem>
              </MenuList>
              <MenuItem>
                <ListItemText>Untagged Files</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemText>Emailed Files</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemText>Medical Leave Certificate</ListItemText>
              </MenuItem>
            </MenuList>
          </Card>
        </Stack>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={3}>
            {fileLists?.length > 0 && fileLists.map((fileList) => (
              <FilesList key={fileList.id} fileList={fileList}/>
            ))}
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
