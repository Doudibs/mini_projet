const express = require('express')
const app = express();
const loggerMiddleware = require('./middlewares/loggerMiddleware')
const corsMiddleware = require('./middlewares/corsMiddleware')
const projectsRouter = require('./routes/ProjectsRoutes')


app.use(express.static('public'));


app.use(express.json());
//Midllwares
app.use(corsMiddleware);
app.use(loggerMiddleware);


//Routes
app.use('/api/projects', projectsRouter);

app.get('/api/status', (req, res) => {
    res.json({status: "Serveur Operationnel"})
})

app.listen(3000, ()=>{
    console.log("serveur demarré sur http://localhost:3000")
})