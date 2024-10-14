
const express = require("express");
const sql = require("mssql");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const { authRouters } = require('./routers/authRoutes');
const { userRouter } = require('./routers/user_routes');
const { postsRouter } = require('./routers/posts_router');
const { verifyToken, errorHandler, undefinedRoutesHandler } = require('./middlewares/middleware');

app.use('/users', authRouters);

app.use(verifyToken)
app.use('/users', userRouter);
app.use('/posts' ,postsRouter);
app.use(errorHandler);
app.use('*', undefinedRoutesHandler)

const config = {
    user: "sa",
    password: "Josh@4889",
    server: "localhost",
    database: "social_media",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

//CONNECT TO DATABASE
sql.connect(config, err =>{
    if (err) {
        throw err;
    };
    console.log("Connection successfull!")
});


const port = 3500;
app.listen(port, ()=>{
    console.log(`Server listening to port: ${port}`)
});