import PropTypes from 'prop-types';
import * as Yup from 'yup';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import capitalize from 'lodash/capitalize';
// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { Card, Button, Box, Chip, Grid, Stack, TextField, TextareaAutosize, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar, IconButton, InputLabel, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DatePicker from '@mui/lab/DatePicker';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// redux
import { addMedicalCertificate, addClinicalNotes } from '../../../redux/slices/patient';
import { addNotes, getNotes } from '../../../redux/slices/setting';
import { useDispatch, useSelector } from '../../../redux/store';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
  RHFCheckbox
} from '../../../components/hook-form';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import { calculateAge, mediaURL } from '../../../utils/utilities';
import useUsers from '../../../hooks/useUsers';

NotesNewEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentNotes: PropTypes.object,
};

export default function NotesNewEditForm({ isEdit, currentNotes }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { patients, user: _userList } = useUsers();
    
    const { name = '', id = '' } = useParams();
    const currentPatient = patients.find((user) => Number(user.id) === Number(id));
    const [user, setUser] = useState([])

    useEffect(() => {
        const staff =  _userList.filter(user => user.isStaff)
        setUser(staff)
        setValue('orderedBy', staff[0]?.id);
        setValue('plannedOn', new Date());
    },[_userList])

    const { notes } = useSelector((state) => state.setting);

    const defaultFormContent = {
        complaints: [
            {title: ''}
        ],
        diagnoses: [
            {title: ''}
        ],
        investigations: [
            {title: ''}
        ],
        notes: [
            {title: ''}
        ],
    }
    const [formContent, setFormContent] = useState(defaultFormContent);

    useEffect(() => {
        dispatch(getNotes())
    },[dispatch])

    const validationSchema = Yup.object().shape({
        complaints: Yup.array().of(
          Yup.object().shape({
            title: Yup.string().required('This feild is required'),
          })
        ),
        diagnoses: Yup.array().of(
            Yup.object().shape({
              title: Yup.string().required('This feild is required'),
            })
          ),
        investigations: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('This feild is required'),
            })
        ),
        notes: Yup.array().of(
            Yup.object().shape({
                title: Yup.string().required('This feild is required'),
            })
        ),
    });
    
    const defaultValues = {
        complaints: [{ title: "" }],
        diagnoses: [{ title: "" }],
        investigations: [{ title: "" }],
        notes: [{ title: "" }],
        // orderedBy: defaultUser
    } 
    const methods = useForm({
        // resolver: yupResolver(NewMLCSchema),
        defaultValues,
    });
    const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    reset,
    control
    } = methods;

    const { errors } = formState;
    const { fields, append, prepend, remove, replace } = useFieldArray({
        name: "notes",
        control,
        rules: {
          required: "Please append at least 1 item"
        }
    });

    const triggerDelete = (noteType, i) => {
        // append({ complaints: { title: 'test' } });
        const clonedFormContent = {...formContent}
        clonedFormContent[noteType].splice(i, 1)
        setFormContent(clonedFormContent)
        reset(clonedFormContent)
    }
    const onSubmit = (data) => {
        console.log(data);
        const clonedData = {...data}
        delete clonedData.plannedOn
        delete clonedData.id
        delete clonedData.orderedBy
        const payload = {
            patientId : currentPatient.id,
            notes: JSON.stringify(clonedData),
            orderedBy: data.orderedBy,
            plannedOn: data.plannedOn
        }
        dispatch(addClinicalNotes(payload))
        enqueueSnackbar('Create success!');
        navigate(PATH_DASHBOARD.patient.notes);
        console.log(payload)
    }

    const [noteType, setNoteType] = useState('complaints');
    const [newNote, setNewNote] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);

    useEffect(() => {
        console.log(noteType, notes)
        const clonedNotes = [...notes]
        if(noteType && notes.length){
            const filtered = clonedNotes.filter(note => note.type === noteType)
            setFilteredNotes(filtered)
        }
    },[noteType, notes])

    const handleChange = (event: SelectChangeEvent) => {
        setNoteType(event.target.value);
        console.log(event.target.value)
    };
    const handleSubmitNewNotes = (event) => {
        event.preventDefault();
        const payload = {
            type: noteType,
            name: newNote
        }
        dispatch(addNotes(payload))
        console.log(`The name you entered was: ${newNote}`)
    }

    const selectedNotes = (selected) => {
        const clonedFormContent = {...formContent}
        // setValue(`${selected.type}.${clonedFormContent[selected.type] - 1}.title`, selected.name)
        setValue(`${selected.type}.${clonedFormContent[selected.type].length - 1}.title`, selected.name)
        clonedFormContent[selected.type].unshift({title: selected.name});
        
        setFormContent(clonedFormContent)
        console.log(selected, clonedFormContent)
    }
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
                <Card sx={{ p: 3, display: 'grid', rowGap: 3, }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    {formContent && Object.keys(formContent).map(key => {
                        return [...Array(formContent[key].length)].map((x, i) => 
                            <Box
                                sx={{
                                display: 'flex',
                                m: 2,
                                alignItems: 'center',
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                                }}
                            >
                                <RHFTextField name={`${key}.${i}.title`} errors={errors.testInput} options={{ required: true }} label={capitalize(key)} />
                                {i !== formContent[key].length - 1 && <IconButton onClick={() => triggerDelete(key, i)}>
                                    <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                                </IconButton>}
                            </Box>
                        )
                    })
                    }
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', p: 2, position: 'fixed', bottom: 0, right: '0', background: '#FFF', width: '50%', gap: '20px' }}>
                        <RHFSelect name="orderedBy" label="Ordered By" placeholder="Ordered By">
                            {user.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.firstName} {option.lastName}
                            </option>
                            ))}
                        </RHFSelect>
                        <Controller
                            name="plannedOn"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                            <DatePicker
                                label="Planned On"
                                value={field.value}
                                onChange={(newValue) => {
                                field.onChange(newValue);
                                }}
                                renderInput={(params) => (
                                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                                )}
                            />
                            )}
                        />
                    </Box>
                    <div>
                        <LoadingButton type="submit" variant="contained" size="large" >
                            Save
                        </LoadingButton>
                    </div>
                    </FormProvider>
                </Card>
            </Grid>
            <Grid item xs={12} md={5}>
                <Card sx={{ py: 5, px: 3, display: 'grid', rowGap: 2,  marginBottom: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} p={1} sx={{
                    width: '100%'
                    }}>
                    <Avatar alt={currentPatient.patientName} src={currentPatient.dp} sx={{ mr: 2 }} />
                    <Typography variant="subtitle2" noWrap>
                    {currentPatient.patientName}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                    {calculateAge(currentPatient.dob)} Year(s) / {currentPatient.gender}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                    {currentPatient.id}
                    </Typography>
                </Stack>
                <Box sx={{ display: 'grid', alignItems: 'center', justifyItems: 'center', columnGap: 2, rowGap: 3, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' } }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Note Type</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={noteType}
                        label="Select"
                        onChange={handleChange}
                        >
                        <MenuItem value='complaints'>Compaints</MenuItem>
                        <MenuItem value='diagnoses'>Diagnoses</MenuItem>
                        <MenuItem value='investigations'>Investigations</MenuItem>
                        <MenuItem value='notes'>Notes</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined">New {noteType}</Button>
                </Box>
                <form onSubmit={handleSubmitNewNotes}>
                    <Stack sx={{ display: 'flex', rowGap: 2 }}>
                        <TextField id="outlined-multiline-flexible" multiline maxRows={4} name='newNote' label="New Note" value={newNote} onChange={(e) => setNewNote(e.target.value)}/>
                        <LoadingButton type="submit" variant="contained" size="large" >
                            Save
                        </LoadingButton>
                    </Stack>
                </form>
                
                <Scrollbar>
                    <MenuList>
                        {!!filteredNotes?.length && filteredNotes.map((note) => (
                            <MenuItem key={note.id} onClick={() => selectedNotes(note)}>
                                <ListItemText>{note.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Scrollbar>
                </Card>
            </Grid>
        </Grid>
      );
}