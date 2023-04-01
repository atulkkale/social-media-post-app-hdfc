exports.createPost = async (req, res) => {
  res.json({ message: 'Post created successfully' });
};

exports.updatePost = async (req, res) => {
  res.json({ message: 'Post updated successfully' });
};

exports.deletePost = async (req, res) => {
  res.json({ message: 'Post deleted successfully' });
};

exports.getAllPosts = async (req, res) => {
  res.json({ message: 'Posts fetched successfully' });
};
