const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const pasport = require('passport')
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const  keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('MongoDb connected')
    })
    .catch((error)=>{
        console.log(error)
    });
app.use(pasport.initialize());
require('./middleware/pasport')(pasport);
app.use(require('morgan')('dev'));
app.use('/uploads',express.static('uploads'));
app.use(require('cors')());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/auth',authRoutes);
app.use('/api/analytics',analyticsRoutes);
app.use('/api/order',orderRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/position',positionRoutes);



module.exports = app;