exports.createUser = async (req, res) => {
  res.json({ message: 'User created successfully' });
};

exports.getUserInfo = async (req, res) => {
  res.json({ message: 'User info fetched successfully' });
};
