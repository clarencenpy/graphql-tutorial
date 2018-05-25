const USER_TOKEN_MAP = {
  verysecretkey: 'admin',
};

export const getUser = token => USER_TOKEN_MAP[token] || undefined