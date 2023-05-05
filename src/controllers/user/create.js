const createUser = async (req, res) => {
  const {
    session,
    db: { User },
    body: { username, password, firstName, lastName, email },
  } = req;
  const user = await User.create(username, password, firstName, lastName, email);
  console.log(user)
  session.userId = user.id;

  res.send(user);
};

module.exports = createUser;
