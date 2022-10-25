import * as React from 'react';
import { useRef, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import Iconify from './Iconify';


const options = ['Sent', 'In Production', 'In Transit', 'Received'];

export default function ToothSelectionButton({from, to}) {
  const [toothArr, setToothArr] = useState([]);
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef();
  const [selectedIndex, setSelectedIndex] = React.useState(1);


  useEffect(() => {
    generateObj(from, to)
  },[from, to]);

  function generateObj(from, to){
    const localToothArr = []
    const reverse = to < from;
    for (let i = from; (reverse ? i >= to : i <= to) ; (reverse ? i-=1 : i += 1)) {
      const toothObj = {
        id: i,
        checked: false,
      }
      localToothArr.push(toothObj)
    }      
    setToothArr(localToothArr)  
    console.log(localToothArr)
  }

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleChange = (option) => {
    let localToothArr = toothArr
    localToothArr = toothArr.map(obj => obj.id === option.id ? {...obj, checked : !option.checked} : obj)
    // localToothArr = [...localToothArr]
    setToothArr(localToothArr)
    console.log(localToothArr, toothArr)
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`, mx: 0.1 }}>
        {toothArr.map((option) => (
          <FormControlLabel key={option.id}
            sx={{margin:'0'}}
            control={
              <Checkbox
                size="small"
                color="success"
                checked={option.checked}
                icon={<Icon icon="mdi:tooth-outline"/>}
                checkedIcon={<Icon icon="mdi:tooth-outline"/>}
                onChange={()=>{handleChange(option)}}
              />
            }
            label={option.id}
            labelPlacement="top"
          />
        ))}
      </Box>
    </>
  );
}