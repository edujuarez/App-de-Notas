const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/notes-app',{
    useCreateIndex: true,
    useFindAndModify:false,
    useNewUrlParser:true
})
.then(db => console.log('Conexion a mongoDB exitosa') )
.catch( err => console.error(err));