const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const dataUsers = require('./users.json');
const dataPosts = require('./posts.json');
const dataComments = require('./comments.json')

const seedUserDatabase = async () => {
  await sequelize.sync({ alter: true });

  await User.bulkCreate(dataUsers, {
    individualHooks: true,
    returning: true,
  });

  for (const post of dataPosts) {
    await Post.create({
      ...post,
      timestamp: new Date,
    });
  }

  for (const comment of dataComments) {
    await Comment.create({
      ...comment,
      timestamp: new Date,
    });
  }

  process.exit(0);
};

seedUserDatabase();