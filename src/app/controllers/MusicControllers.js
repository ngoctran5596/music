
const Song = require('../model/MusicModel');

class MusicControllers {

    index(req, res, next) {
        res.render('home')
    }

    async getMusic(req, res, next) {
        const song =  await Song.find ();
        res.json(song)
    }

    musicPost(req, res, next) {
        console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body", req.body);
        console.log("req.bodyreq.bodyreq.bodyreq.bodyreq.bodyreq.body", req.file);
        console.log(process.env.MUSIC_URL)

        const { title, album, albumArtist, year, singer } = req.body;

        if (req.file) {
            const path = process.env.MUSIC_URL + req.file.filename;
        
            const songNew = new Song({
                title,
                album,
                albumArtist,
                year,
                singer,
               
                path,
            });
            songNew.save()
                .then((data) => res.json(data))
                .catch((err) => {
                    res.json(err);
                })
        } else {
            res.json('không bài hát')
        }
    }
}

module.exports = new MusicControllers();