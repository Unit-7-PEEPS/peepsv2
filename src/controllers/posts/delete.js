const deletePost = async (req, res) => {
    const { 
        session,
        Post, 
        params: { id } 
    } = req;
    const didDelete = await Post.delete(Number(id));
    if (!didDelete) {
        return res.status(404).send('Not Found');
    }
    res.sendStatus(204);
};
  
module.exports = deletePost;