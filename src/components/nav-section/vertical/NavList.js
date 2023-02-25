import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { List, Collapse } from '@mui/material';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { getActive } from '..';
import useAuth from '../../../hooks/useAuth';
import { getCurrentUserRole } from '../../../utils/currentUserRole';

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
  isCollapse: PropTypes.bool,
  list: PropTypes.object,
};

export function NavListRoot({ list, isCollapse }) {
  const { pathname } = useLocation();

  const { user } = useAuth()

  const currentRole = getCurrentUserRole(user)

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        {list?.access?.includes(currentRole) && (<NavItemRoot item={list} isCollapse={isCollapse} active={active} open={open} onOpen={() => setOpen(!open)} />)}

        {!isCollapse && list?.access?.includes(currentRole) && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(list.children || []).map((item) => (
                <NavListSub key={item.title} list={item} />
              ))}
            </List>
          </Collapse>
        )}
      </>
    );
  }

  if(list?.access?.includes(currentRole)){
    return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />
  }
  return false;

  // return <NavItemRoot item={list} active={active} isCollapse={isCollapse} />;
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
  list: PropTypes.object,
};

function NavListSub({ list }) {
  const { pathname } = useLocation();

  const { user } = useAuth()

  const currentRole = getCurrentUserRole(user)

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
         {list?.access?.includes(currentRole) && (<NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />)}

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub key={item.title} item={item} active={getActive(item.path, pathname)} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }
  
  if(list?.access?.includes(currentRole)){
    return <NavItemSub item={list} active={active} />
  }
  return false;
  // return {list?.access?.includes(currentRole) && (<NavItemSub item={list} active={active} />)}
}
