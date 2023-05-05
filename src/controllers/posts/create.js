const createPosts = async (req, res) => {
  const {
    session,
    db: { Post },
    body: { content },
  } = req;
  const post = await Post.create(content, session.userId);

  res.send(post);
};

module.exports = createPosts;
