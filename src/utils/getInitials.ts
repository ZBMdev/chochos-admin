const getInitials = (user: any) => {
    return user.firstName.charAt(0).toUpperCase();
  }

export default getInitials;