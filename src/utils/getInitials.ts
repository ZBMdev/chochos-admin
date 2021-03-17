const getInitials = (user: any) => {
    return user.name.charAt(0).toUpperCase();
  }

export default getInitials;