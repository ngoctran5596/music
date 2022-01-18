const express = require('express');
const routes = express.Router();

const musicControllers = require('../app/controllers/MusicControllers')
const upload = require('../config/upload')


routes.get('/', musicControllers.index)
routes.get('/music', musicControllers.getMusic)
routes.post('/postmusic', upload.single('testmp3'), musicControllers.musicPost)

module.exports = routes