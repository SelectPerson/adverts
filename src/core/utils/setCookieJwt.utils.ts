export const setCookieJwt = async (response, refreshToken) => {
  return await response.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 1000,
  });
};
