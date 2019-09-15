const express = require ('express'); //inicio express
const path = require ('path'); //inicio path
const exphbs = require ('express-handlebars'); //inicio handlebars
const methodOverride = require ('method-override'); //Inicio methOver para poder enviar otros methodos por form
const session = require ('express-session');
const flash = require ('connect-flash');
const passport = require ('passport');


//Inicializaciones
const app = express();
require ('./database');
require ('./config/passport');

//Configuraciones
app.set('port', process.env.PORT || 3000);//establezco puerto de server
app.set('views', path.join(__dirname,'views'));//establezco ruta de views
app.engine('.hbs', exphbs({
    defatultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs'
} )); //configuracion de rutas de plantillas
app.set('view engine', '.hbs');


//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));//config de el middleware de sesion
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//Variables Globales
app.use((req, res, next) => {
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Rutas
app.use(require ('./routes/index'));
app.use(require ('./routes/notes'));
app.use(require ('./routes/users'));


//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//Servidor
app.listen(app.get('port'), function(){
    console.log('Servidor funcionando en puerto: ', app.get('port'));
});