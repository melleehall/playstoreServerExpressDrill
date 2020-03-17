const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const playstore = require('./playstore-data.js');

// will accept 2 parameters (sort and genres)
app.get('/apps', (req, res) => {
    const { sort, genres } = req.query;

    if (sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res  
                .status(400)
                .send('Sort must be equal to Rating or App')
        }
    }

    if (genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
                .status(400)
                .send('Sort must be equal to Action, Puzzle, Strategy, Casual, Arcade, or Card')
        }
    }

    let results = playstore
        .filter(app =>
            app
                .Genres
                .toLowerCase()
                .includes(genres.toLowerCase()));

                
    if (sort === 'App') {
        results
            .sort((a, b) => {
                return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1: a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 0;
            });
    } else {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
        });
    }

    res
        .json(results);
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
});