

// ----------------------------------------------------------------------

export function getCurrentUserRole(user) {

  let role = 'front_office'
  if(user.is_superuser){
    role = 'admin';
  } else if(user.is_staff){
    role = 'doctor';
  } else if(user.is_front_office){
    role = 'front_office';
  } else if(user.is_back_office){
    role = 'back_office';
  }
  return role;

}