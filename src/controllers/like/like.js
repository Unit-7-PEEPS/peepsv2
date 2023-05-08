const makeLike = async (req, res) => {
    const {
      session,
      db: { Post },
      body: { post_id },
    } = req;
    const post = await Post.create(session.userId, post_id);
    session.userId = user.id;
  
    res.send(post);
  }; 
  
  module.exports = makeLike;