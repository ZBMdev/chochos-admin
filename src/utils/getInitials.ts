const getInitials = (user: any) => {
    return user.fullName.charAt(0).toUpperCase();
  }

export default getInitials;