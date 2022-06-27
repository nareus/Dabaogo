export const USER = '[USER]';
export const USER_LOGIN = `${USER} Set user as logged in`;
export const USER_LOGOUT = `${USER} Set user as logged out`;

export const userLogin = ({
  userId,
  password,
  phoneNumber,
  email,
  firstName,
  lastName,
  currOrderId,
}) => ({
  type: USER_LOGIN,
  payload: {
    userId,
    password,
    phoneNumber,
    email,
    firstName,
    lastName,
    currOrderId,
  },
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: {},
});
