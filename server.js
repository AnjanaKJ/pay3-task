const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const profileRoute = require('./routes/profileRoute');
const tweetRoute = require('./routes/tweetRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/tweet', tweetRoute);

mongoose.connect('mongodb://127.0.0.1:27017/twitter', {
//  useNewUrlParser: true,
//  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});
