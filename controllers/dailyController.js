const Daily = require('../model/daily');

const getDaily = async (req, res) => {
    try {
        const daily = await Daily.findAll();
        console.log(`Found ${daily.length} posts.`);
        res.json(daily);
    } catch (err) {
        console.error(`Error getting posts: ${err}`);
        return res.status(204).json({ 'message': 'No posts found!' });
    }
};

const getDailyOne = async (req, res) => {
    try {
        const daily = await Daily.findByPk(req.params.id);
        if (daily) {
            res.json(daily);
        } else {
            res.status(404).json({ 'message': 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createDaily = async (req, res) => {
    try {
        const daily = await Daily.create(req.body);
        res.status(201).json(daily);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateDaily = async (req, res) => {
    const dailyId = req.params.id;

    if (!dailyId) {
        return res.status(400).json({ message: 'Post ID is required' });
    }

    const { title, body } = req.body;
  
    try {
      const [numUpdated, updatedPost] = await Daily.update(
        { title, body },
        { where: { id: dailyId }, returning: true }
      );
  
      if (numUpdated === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      return res.status(200).json(`${updatedPost} post successfully updated.`);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

const deleteDaily = async (req, res) => {
    try {
        const rowsDeleted = await Daily.destroy({ where: { id: req.params.id } });
        if (rowsDeleted > 0 ) {
            res.json({ 'message': 'Post deleted' });
        } else {
            res.status(404).json({ 'message': 'Post not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDaily,
    getDailyOne,
    createDaily,
    updateDaily,
    deleteDaily
};