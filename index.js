import express from 'express';
import ConectarDb from './config/db.js';
import usuarios from './routes/usuarios.js';
import auth from './routes/auth.js';
import proyectos from './routes/proyectos.js';
import tareas from './routes/tareas.js';
import cors from 'cors';


const app = express();

const port = process.env.port || 4000;
ConectarDb();
app.use(cors());
app.get('/' ,(req, res)=>{
    res.send("Hola desde la pagina principal");
});

app.use( express.json({ extended: true }) )

app.use('/api/usuarios', usuarios)
app.use('/api/auth', auth)
app.use('/api/proyectos', proyectos)
app.use('/api/tareas', tareas)

app.listen(port, ()=>{
    console.log(`el servidor esta corriendo en el puerto ${port}`);
});






