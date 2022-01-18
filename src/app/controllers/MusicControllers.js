
const Song = require('../model/MusicModel');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose.js')
class MusicControllers {

    index(req, res, next) {
        res.render('home')
    }

    create(req, res, next) {
        res.render('musics/music')
    }

    async getMusic(req, res, next) {
        const song = await Song.find();
        console.log(song)
        res.render('home', { songs: mutipleMongooseToObject(song) });

    }
    musicPost(req, res, next) {
        if (req.files) {
            let pathimage;
            let pathmp3;
            const arr = req.files;

            for (let i = 0; i < arr.length; i++) {
                if (arr[i].mimetype === 'image/jpeg') {
                    pathimage = process.env.MUSIC_URL + arr[i].filename
                } else {
                    pathmp3 = process.env.MUSIC_URL + arr[i].filename
                }
            }
            console.log('pathimage', pathimage, pathmp3)

            const { title, album, albumArtist, year, singer } = req.body;

            const songNew = new Song({
                title,
                album,
                albumArtist,
                year,
                singer,
                pathimage,
                pathmp3
            });
            songNew.save()
                .then((data) => res.redirect('/music'))
                .catch((err) => {
                    res.json(err);
                })
        } else {
            res.json('không bài hát')
        }
    }

    // musicPost(req, res, next) {
    //     console.log(process.env.MUSIC_URL)

    //     const { title, album, albumArtist, year, singer } = req.body;

    //     if (req.file) {
    //         const path = process.env.MUSIC_URL + req.file.filename;

    //         const songNew = new Song({
    //             title,
    //             album,
    //             albumArtist,
    //             year,
    //             singer,
    //             path,
    //         });
    //         songNew.save()
    //             .then((data) => res.render('home'))
    //             .catch((err) => {
    //                 res.json(err);
    //             })
    //     } else {
    //         res.json('không bài hát')
    //     }
    // }
}

module.exports = new MusicControllers();