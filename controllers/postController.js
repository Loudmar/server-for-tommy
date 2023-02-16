const Posts = require('../model/posts');

const getPosts = async (req, res) => {
    try {
        const post = await Posts.findAll();
        console.log(`Found ${post.length} posts.`);
        res.json(post);
    } catch (err) {
        console.error(`Error getting posts: ${err}`);
        return res.status(204).json({ 'message': 'No posts found!' });
    }
};

const getPost = async (req, res) => {
    try {
        const post = await Posts.findByPk(req.params.id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ 'message': 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createPost = async (req, res) => {
    try {
        const post = await Posts.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updatePost = async (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    const { title, body } = req.body;
  
    try {
      const [numUpdated, updatedPost] = await Posts.update(
        { title, body },
        { where: { id: postId }, returning: true }
      );
  
      if (numUpdated === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      return res.status(200).json(`${updatedPost} post successfully updated.`);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    if (!postId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    try {
        const post = await Posts.findOne({ where: { id: postId } });
        console.log(post);
        if (!post) {
        return res.status(404).json({ message: 'Post not found' });
        }

        await Posts.destroy({ where: { id: postId } });

        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};