import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card,  Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar, TableRow, Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
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
import Image from '../../../components/Image';
import { calculateAge, mediaURL } from '../../../utils/utilities';
// ----------------------------------------------------------------------

const GENDER_OPTION = ['Men', 'Women', 'Kids'];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

FilesList.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function FilesList({patient, fileLists, mlcLists}) {
  console.log('patient, fileList', patient, fileLists, mlcLists)
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onDeleteRow = () => {
    console.log('D')
  };

  const onEditRow = () => {
    console.log('E')
  };
  // const [] = useState()
  const img = 'https://ray.practo.com/api/v1/files/182345982?size=medium_thumbnail'
  return (
    <Grid container spacing={3}>
      <Card sx={{
              width: '100%'
            }}>
      <Stack direction="row" alignItems="center" spacing={1} p={1} sx={{
              width: '100%'
            }}>
          <Avatar alt={patient.patientName} src={patient.dop} sx={{ mr: 2 }} />
          <Typography variant="subtitle2" noWrap>
            {patient.patientName}
          </Typography>
          <Typography variant="subtitle2" noWrap>
          {calculateAge(patient.dob)} Year(s) / {patient.gender}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {patient.id}
          </Typography>
      </Stack>
      <Divider/>
      <Stack direction="row" alignItems="center" spacing={1} p={1} sx={{
              width: '100%'
            }}>
        
        {fileLists && fileLists.length && fileLists.map((file, i) =>
        <div key={i}>
          <a href={mediaURL(file.File_to_upload)} download target="_blank" rel="noopener noreferrer">
          <Image
                key={file.File_to_upload}
                alt="large image"
                src={file.File_to_upload}
                sx={{ width: 150, height: 200, borderRadius: 1.5, mr: 2 }}
                // onClick={() => handleOpenLightbox(img)}
                // sx={{ cursor: 'zoom-in' }}
              />
          </a>
          <Typography variant="subtitle2"  sx={{textAlign: 'center'}} noWrap>
            {file.File_to_upload.split('/').pop()}
          </Typography>
        </div>)
        }
        {(mlcLists && mlcLists.length && <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Issued On</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mlcLists.map((mlc, i) =>
              <TableRow>
                <TableCell align="left">{mlc.MLNo}</TableCell>
                <TableCell align="left">{mlc.issuedOn}</TableCell>
                <TableCell align="right">
                  <TableMoreMenu
                    open={openMenu}
                    onOpen={handleOpenMenu}
                    onClose={handleCloseMenu}
                    actions={
                      <>
                        <MenuItem
                          onClick={() => {
                            onDeleteRow();
                            handleCloseMenu();
                          }}
                          sx={{ color: 'error.main' }}
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
                          <Iconify icon={'eva:edit-fill'} />
                          Edit
                        </MenuItem>
                      </>
                    }
                  />
                </TableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>)}
      </Stack>
      </Card>
    </Grid>
  );
}
