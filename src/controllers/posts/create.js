const createPosts = async (req, res) => {
  const {
    session,
    db: { Post },
    body: { communityId, content },
  } = req;
  const post = await Post.create(communityId, content, session.userId);
  session.userId = user.id;

  res.send(post);
};

module.exports = createPosts;
