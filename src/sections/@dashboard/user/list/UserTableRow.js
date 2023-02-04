import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
import moment from 'moment'
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';


// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { first_name: firstName, last_name: lastName, display_picture: displayPicture, is_staff: isStaff, is_active: isActive, is_superuser: isSuperuser, is_front_office: isFrontOffice, is_back_office: isBackOffice, last_login: lastLogin } = row
  // const { firstName, lastName, displayPicture, isActive, isSuperuser, isFrontOffice, isBackOffice, isStaff, lastLogin, status } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      {/* <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell> */}

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={firstName} src={displayPicture} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {firstName} {lastName}
        </Typography>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {isSuperuser ? '/ Admin /': ''}
        {isStaff ? '/ Doctor /': ''}
        {isFrontOffice ? '/ Front Office /': '/ Back Office /'}
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(isActive && 'success') || 'error'}
          sx={{ textTransform: 'capitalize' }}
        >
          {isActive ? 'Active': 'Not Active'}
        </Label>
      </TableCell>

      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
         {lastLogin && <span>{moment(lastLogin).format('YYYY-MM-DD HH:mm:ss')}</span>}
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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
