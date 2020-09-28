const express = require('express');
const tagsRouter = express.Router();

const { requireUser } = require('./utils');

const { getAllTags } = require('../db');

const { getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {

  next();
});

tagsRouter.get('/',requireUser, async (req, res) => {
    const tags = await getAllTags();
  res.send({
    Tags: []
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const tagName = req.params.tagName;
  try {
    const postsByTagName = await getPostsByTagName(tagName);
    const posts = postsByTagName.filter(post => {
      console.log('post.active', post.active);
      console.log('req.user', req.user);
    return post.active && (req.user && post.author.id === req.user.id);
    });
    res.send({ posts });
  } catch ({ name, message }) {

    next({ name, message });
  }
});

module.exports = tagsRouter;