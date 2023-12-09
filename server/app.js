// app.js
const express = require('express');
const app = express();
const port = 3000;
const database = require('./config/database')
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const cors = require("cors");
// const session = require('express-session');
const cookieParser = require('cookie-parser');


database.connectToMongoDB();

app.use(cookieParser());
app.use(cors());



  //to prevent going back after logout on the login page
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
  });

// app.use(
//   session({
//     secret: 'your_secret_key', // Replace with a secure secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: { 
//       secure: false, // Set to true if using HTTPS
//       maxAge:  60 * 1000 // Set the expiration time in milliseconds (1 min in this example)
//     }
//   })
// );

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', userRouter);
app.use('/api/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
