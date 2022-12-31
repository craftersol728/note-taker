const express = require ('express');
const app = express ();

const fs = require ('fs');
const routes = require('routes');

//require routes code from routes folder
const apiRoutes = require ('./routes/apiRoutes');
const htmlRoutes = require ('./routes/htmlRoutes');

// It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded({
    extended: true
}));

//makes clear what the root directory is
app.use(express.static('public'));
app.use(express.json());


//connecting routes together
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    //debugging
    console.log(`API server now on port ${PORT}!`);
});