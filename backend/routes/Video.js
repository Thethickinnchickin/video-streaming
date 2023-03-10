const express = require('express')
const router = express.Router()
const videos = require('../mockData')
const fs = require('fs')
// get list of videos
router.get('/', (req,res)=>{

    res.json(videos)
})




router.get('/video/:id/caption', (req, res) => 
    res.sendFile(`assets/captions/${req.params.id}.vtt`, { root: __dirname }));


// make request for a particular video
router.get('/video/:id', (req,res)=> {
    const videoPath = `assets/${req.params.id.replace(/\s+/g, '-')}.mp4`;
    const videoStat = fs.statSync(videoPath);
    const fileSize = videoStat.size;
    const videoRange = req.headers.range;
    if(videoRange) {
        console.log("SCENERIO 1")
        const parts = videoRange.replace(/bytes=/,  "").split("-");
        const start = parseInt(parts[0], 10);
        
        const end = parts[1]
            ? parseInt(parts[1])
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(videoPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        console.log("SCENERIO 2")
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
});

// make request for a particular video
router.get('/:id/data', (req,res)=> {
    const id = parseInt(req.params.id, 10)
    res.json(videos[id])
})

module.exports = router;