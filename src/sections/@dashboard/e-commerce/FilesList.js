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
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar } from '@mui/material';
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
import Image from '../../../components/Image';
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

export default function FilesList({fileList}) {
  const navigate = useNavigate();
  const {patient, files} = fileList
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
          <Avatar alt={patient.name} src={patient.avatarUrl} sx={{ mr: 2 }} />
          <Typography variant="subtitle2" noWrap>
            {patient.name}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {patient.age} / {patient.gender}
          </Typography>
          <Typography variant="subtitle2" noWrap>
            {patient.id}
          </Typography>
      </Stack>
      <Divider/>
      <Stack direction="row" alignItems="center" spacing={1} p={1} sx={{
              width: '100%'
            }}>
        <div>
          <Image
                key={img}
                alt="large image"
                src={img}
                sx={{ width: 150, height: 200, borderRadius: 1.5, mr: 2 }}
                // onClick={() => handleOpenLightbox(img)}
                // sx={{ cursor: 'zoom-in' }}
              />
          <Typography variant="subtitle2"  sx={{textAlign: 'center'}} noWrap>
            File name
          </Typography>
        </div>
        <div>
          <Image
                key={img}
                alt="large image"
                src={img}
                sx={{ width: 150, height: 200, borderRadius: 1.5, mr: 2 }}
                // onClick={() => handleOpenLightbox(img)}
                // sx={{ cursor: 'zoom-in' }}
              />
          <Typography variant="subtitle2" sx={{textAlign: 'center'}} noWrap>
            File name
          </Typography>
        </div>
      </Stack>
      </Card>
    </Grid>
  );
}
