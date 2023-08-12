import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import SplitButton  from '../../../../components/SplitButton';

//
import useUsers from '../../../../hooks/useUsers';
import { useDispatch, useSelector } from '../../../../redux/store';

// ----------------------------------------------------------------------

LabOrdersTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function LabOrdersTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onViewRow, onStatusSelected }) {
  const theme = useTheme();

  const { users } = useSelector((state) => state.user);

  const { jobId, patientName, orderedBy, labName, workName, status, labExpense, dueDate } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onSelected = (status) => {
    if(row.status !== status){
      const clonedRow = {...row}
      clonedRow.status = status
      onStatusSelected(clonedRow)
    }
  };

/*   useEffect(() => {
    // setUser(_userList.filter(user => user.isStaff))
  },[_userList]) */

  const findDoctor = (id) => {
    const user = users.filter(user => user.is_staff && user.id === Number(id))
    if(user.length){
      return `${user[0].first_name} ${user[0].last_name}`
    }
    return 'NA'
  }

  // const selected

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{jobId}</TableCell>
      <TableCell  align="left">
        <Typography variant="subtitle2" noWrap>
          {patientName}
        </Typography>
      </TableCell>

      <TableCell align="left">{findDoctor(orderedBy)}</TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {workName}
      </TableCell>

      <TableCell align="center">
        {labName}
      </TableCell>

      <TableCell align="left">
        {/* <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'banned' && 'error') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label> */}
        <SplitButton status={status} onSelected={onSelected}/>
      </TableCell>

      <TableCell align="center">
        {dueDate}
      </TableCell>

      <TableCell align="center">
        {labExpense}
      </TableCell>

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
              <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
