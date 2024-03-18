import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import personasRoutes from "./routes/persona.routes.js";
import session from "express-session";
import flash from "express-flash";

/* Inicializacion */
const app = express();
const ___dirname = dirname(fileURLToPath(import.meta.url));
/* configuracion  */
app.set("port", process.env.PORT || 3000);
/* configuracion de las vistas */
app.set("views", join(___dirname, "views"));
/* motor de plantillas config*/
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
/* middlewares */
app.use(
  session({
    secret: "secret-key",
    resave: false, // Evita guardar sesiones no modificadas
    saveUninitialized: false, // Evita guardar sesiones no inicializadas
    cookie: {
      secure: true, // Solo enviar la cookie a través de conexiones HTTPS
      httpOnly: true, // Evitar acceso a la cookie desde JavaScript en el navegador
      maxAge: 3600000, // Tiempo de vida de la cookie en milisegundos (1 hora)
      sameSite: "strict" // Establecer políticas de SameSite para protección contra CSRF
    }
  })
);

app.use(flash());
console.log('Middleware express-flash configurado correctamente');
/* control de peticiones a la api */
app.use(morgan("dev"));
/* Express */
app.use(express.urlencoded({ extended: false }));
/* resolucion en formato json */
app.use(express.json());
/* rutas */
app.get("/", (req, res) => {
  /* ruta para pagina principal con el landing creado */
  res.render("index");
});

app.use(personasRoutes);

/* Archivos publicos */
/* todo lo que se encuentre en public podra se accedido por todos los usuarios que ingresen a nuestra pagina */
app.use(express.static(join(___dirname, "public")));

/* Run server */

app.listen(app.get("port"), () =>
  console.log("Servidor corriedo en puerto", app.get("port"))
);
