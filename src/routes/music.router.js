const express = require('express');
const routes = express.Router();

const musicControllers = require('../app/controllers/MusicControllers')
const upload = require('../config/upload')


routes.get('/', musicControllers.index)
routes.get('/music', musicControllers.getMusic)
routes.get('/createmusic', musicControllers.create)
// routes.post('/postmusic', upload.single('filemp3'), musicControllers.musicPost)
routes.post('/multiple-upload', upload.array("many-files", 17), musicControllers.musicPost)

module.exports = routes