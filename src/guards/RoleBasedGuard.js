import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import {getCurrentUserRole} from '../utils/currentUserRole';
import useAuth from '../hooks/useAuth';
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = (user) => {
  // Logic here to get current user role
  const role = getCurrentUserRole(user)
  
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }) {

  const { user } = useAuth()
  
  const currentRole = getCurrentUserRole(user)

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
