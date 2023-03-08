const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();
//app.use(cors())

const videoRoute = require('./routes/Video');
app.use('/videos', videoRoute)
 
app.listen(9000, () => {
    console.log('Listening on port 9000!')
})