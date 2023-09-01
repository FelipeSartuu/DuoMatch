const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");
const conn = require("./db/conn");


//Criando servidor
const app = express()


//Configurando template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


//Configurando body para receber respostas (POST)
app.use(
    express.urlencoded({
        extended: true
    })
)

//Recebendo dado do body em JSON
app.use(express.json())

//Definindo pasta de arquivos estáticos
app.use(express.static("public"))


// session middleware
app.use(
    session({
      name: 'session',
      secret: 'nosso_secret',
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
      }),

      cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      },
    }),
  )


// Flash messages
app.use(flash())


//Configurando session para receber respostas
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }

    next()
})


//Controllers
const HomeController = require("./controllers/HomeController");

//Models
const Post = require("./models/Post")
const User = require("./models/User")

//Rotas
const homeRoute = require("./routes/homeRouter");
app.use("/", homeRoute)

const authRoute = require("./routes/authRouter")
app.use("/", authRoute)

const postsRoute = require("./routes/postsRouter")
app.use("/posts", postsRoute)




//Estabelecendo a conexão com o banco de dados
conn
//.sync({force: true})
.sync()
.then(() => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
})