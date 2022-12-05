import PropTypes from 'prop-types';
import { Fragment, useState, useEffect } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import ToothSelectionButton from '../../../../components/ToothSelectionButton';


// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

TreatmentPlansList.propTypes = {
  selectedProcedure: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  updatedProcedures: PropTypes.func,
};

export default function TreatmentPlansList({ selectedProcedure, onDelete, onIncreaseQuantity, onDecreaseQuantity, updatedProcedures }) {

  const [selectedTeeths, setSelectedTeeths] = useState([]);

  const [updatedProcedure,  setUpdatedProcedure] = useState([]);

  useEffect(() => {
    const cloneProcedure = selectedProcedure.map(plan => ({...plan, quantity : 1, discount: 0, total: plan.cost, notes: '', teeths: []}));
    setUpdatedProcedure(cloneProcedure);
  },[selectedProcedure])

  useEffect(() => {
    updatedProcedures(updatedProcedure)
  },[updatedProcedure])

  const selectedTeeth = (selected, index) => { // the callback. Use a better name
    const clonedProcedure = [...updatedProcedure]
    let mappedArray = clonedProcedure[index].teeths.concat(',',selected.filter(teeth => teeth.checked && teeth.id).map(teeth => teeth.id).filter(i => clonedProcedure[index].teeths.indexOf(i)))
    mappedArray = mappedArray.filter(arr => arr !== ',')
    clonedProcedure[index].teeths = mappedArray;
    setUpdatedProcedure(clonedProcedure)
    setSelectedTeeths(mappedArray)
  };
  
  const handleChangeDiscount = (value, index) => {
    const clonedProcedure = [...updatedProcedure]
    clonedProcedure[index].discount = value;
    clonedProcedure[index].total = Number(clonedProcedure[index].cost) * clonedProcedure[index].quantity;
    clonedProcedure[index].total = Number(clonedProcedure[index].total) - ((Number(clonedProcedure[index].total) * clonedProcedure[index].discount) / 100);
    setUpdatedProcedure(clonedProcedure)
  }
  const handleNotesChange = (value, index) => {
    const clonedProcedure = [...updatedProcedure]
    clonedProcedure[index].notes = value;
    setUpdatedProcedure(clonedProcedure)
    console.log(updatedProcedure)
  }
  const handleChangeQuantity = (value, index) => {
    const clonedProcedure = [...updatedProcedure]
    clonedProcedure[index].quantity = value;
    clonedProcedure[index].total = Number(clonedProcedure[index].cost) * clonedProcedure[index].quantity;
    setUpdatedProcedure(clonedProcedure)
  }

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Treatments</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Discount</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {updatedProcedure?.map((plan, i) => {
            const { id, procedureName, cost, quantity, discount, total, teeths } = plan;
            return (
              <Fragment key={id}>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      
                      <Box>
                        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                          {procedureName}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="body2">
                            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
                              Notes:&nbsp;
                            </Typography>
                            TEST
                          </Typography>
                          <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="left"><TextField sx={{ m: 1, width: '10ch' }} id="quantity" label="quantity" value={quantity} variant="outlined" onChange={(e)=> {handleChangeQuantity(e.target.value, i)}}/></TableCell>

                  <TableCell align="left">{fCurrency(cost)}</TableCell>
                  
                  <TableCell align="left">
                    <FormControl sx={{ m: 1, width: '10ch' }} variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-weight"
                        value={discount}
                        onChange={(e) => { handleChangeDiscount(e.target.value, i) }}
                        endAdornment={<InputAdornment position="end">%</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                      <FormHelperText id="outlined-weight-helper-text">Discount</FormHelperText>
                    </FormControl>
                  </TableCell>
                  {/* <TableCell align="left">
                    <Incrementer
                      quantity={quantity}
                      available={available}
                      onDecrease={() => onDecreaseQuantity(id)}
                      onIncrease={() => onIncreaseQuantity(id)}
                    />
                  </TableCell> */}

                  <TableCell align="right">{fCurrency(total)}</TableCell>

                  <TableCell align="right">
                    <IconButton onClick={() => onDelete(id)}>
                      <Iconify icon={'eva:trash-2-outline'} width={20} height={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>
                    <TextField
                      sx={{ m: 1, width: '40ch' }}
                      id="outlined-multiline-flexible"
                      label="notes"
                      multiline
                      maxRows={4}
                      onChange={(e) => {handleNotesChange(e.target.value, i)}}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ToothSelectionButton from={18} to={11} i={i} selectedTeeths={teeths} selectedTeeth={selectedTeeth}/>
                      <ToothSelectionButton from={21} to={28} i={i} selectedTeeths={teeths} selectedTeeth={selectedTeeth}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ToothSelectionButton from={48} to={41} i={i} selectedTeeths={teeths} selectedTeeth={selectedTeeth}/>
                      <ToothSelectionButton from={31} to={38} i={i} selectedTeeths={teeths} selectedTeeth={selectedTeeth}/>
                    </Box>
                    <Typography variant="subtitle2" align="center">
                      Child Teeth
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ToothSelectionButton from={55} to={51} i={i} selectedTeeths={selectedTeeths} selectedTeeth={selectedTeeth}/>
                      <ToothSelectionButton from={61} to={65} i={i} selectedTeeths={selectedTeeths} selectedTeeth={selectedTeeth}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ToothSelectionButton from={85} to={81} i={i} selectedTeeths={selectedTeeths} selectedTeeth={selectedTeeth}/>
                      <ToothSelectionButton from={71} to={75} i={i} selectedTeeths={selectedTeeths} selectedTeeth={selectedTeeth}/>
                    </Box>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}
