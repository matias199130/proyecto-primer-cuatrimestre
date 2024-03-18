<!-- DOCUMENTACION PARA EL PROYECTO -->

# Proyecto CRUD con Node.js, Express y Handlebars: pasos para iniciar.

## ***Antes de comenzar, quiero darles unas pautas para trabajar realizar este proyecto:***


- Sean concientes de que deben buscar informacion  en la documentación oficial de cada uno de los módulos utilizados (NodeJS, Express, MySQL, HTML, CSS o incluso algun frameword como bootstrap si se animan)

- **Este proyecto es una guía**, no una solución final. Es posible que deban adaptarlo a sus necesidades

-  **Utilicen GitHub** o similar para almacenar el código fuente del proyecto. Esto les permitirá tener acceso fácil al codigo y ademas les permitira interiorizarse con una pagina que les serviria para mas adelante, ***no es obligatorio el uso pero si muy recomendable***.

- La forma de calificar el proyecto es de a cuerdo a sus funcionalidades como a su codigo, ***pero no significa que se desapruebe si no llegan al total de lo pedido en el***.

- Si no pueden con alguna  tarea, busquen ayuda en sus compañeros o incluso en el profesor, si bien esto es un proyecto con nota se tomara en cuenta que el alumno tiene y esta en constante aprendizaje.

----------------------------------------------------------------------------
### Introducción

En esta guía, aprenderás a construir un proyecto CRUD utilizando Node.js, Express y Handlebars como motor de plantillas. Este proyecto estará enfocado en la gestión de personas, permitiendo realizar operaciones CRUD para agregar, ver, actualizar y eliminar personas.

### Tecnologías Utilizadas

- Node.js: Entorno de ejecución de JavaScript del lado del servidor.
- Express: Marco de aplicación web para Node.js.
- Handlebars: Motor de plantillas para generar vistas dinámicas en Express.
- Morgan: Middleware para el registro de solicitudes HTTP en Express.
- MySQL: Sistema de gestión de bases de datos relacional para almacenar los datos del proyecto.

### Configuración Inicial

##### 1. Inicialización del Proyecto
  ##### **Crea una nueva carpeta para tu proyecto y navega a ella:**

```bash
mkdir proyecto-crud
cd proyecto-crud
```

##### 2. Instalación de Dependencias
   
 #####  **Instala las dependencias necesarias para el proyecto:**

```
npm install express express-handlebars morgan mysql2
```

##### 3. Configuración de las Vistas

 #####  ***Crea una carpeta views para almacenar las plantillas Handlebars y otra carpeta layouts dentro de views para los diseños principales de las páginas. Además, crea una carpeta partials dentro de views para los fragmentos de código reutilizables y una carpeta para cada ruta en la que desees visualizar una página en formato .hbs.***



***Por ejemplo:***

```
proyecto-crud/
|-- views/
|   |-- layouts/
|       |-- main.hbs
|   |-- partials/
|       |-- header.hbs
|       |-- footer.hbs
|   |-- personas/(ejemplo)
|       |-- add.hbs
|       |-- edit.hbs
|       |-- list.hbs
|       |-- delete.hbs
|   |-- index.hbs
```

Configuración de Express y Handlebars

##### 4. Configuración de Express


##### **Crea un archivo index.js y configura Express para iniciar el servidor:**
```
import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/_ Inicializacion _/
const app = express();
const \_\_dirname = dirname(fileURLToPath(import.meta.url));

/_ Configuracion _/
app.set("port", process.env.PORT || 3000);
app.set("views", join(\_\_dirname, "views"));
app.engine(
".hbs",
engine({
defaultLayout: "main",
layoutsDir: join(app.get("views"), "layouts"),
extname: ".hbs",
partialsDir: join(app.get("views"), "partials")
})
);
app.set("view engine", ".hbs");

/_ Middlewares _/
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/_ Rutas _/
// Aquí deberías agregar las rutas para las operaciones CRUD de personas

/_ Archivos Estáticos _/
app.use(express.static(join(\_\_dirname, "public")));

/_ Run Server _/
app.listen(app.get("port"), () =>
console.log("Servidor corriendo en puerto", app.get("port"))
);
Rutas para Operaciones CRUD
Crea un archivo personas.routes.js en la carpeta routes y agrega las rutas para las operaciones CRUD de personas:

```

## Rutas necestarias


```
import { Router } from "express";
import pool from "../database.js";

const router = Router();

// Ruta para agregar una nueva persona

router.get("/add", (req, res) => {

// Renderiza la vista para agregar una nueva persona

res.render("personas/add");
});

router.post("/add", async (req, res) => {
try {
// Desestructuramos directamente los campos del cuerpo de la solicitud

const { campo1, campo2, campo3, campo4 } = req.body;

// Ejemplo de inserción de una nueva persona en la base de datos
// Aquí deberías realizar la inserción en la base de datos utilizando pool.query
()

} catch (err) {
res.status(500).json({ message: err.message });
}
});

// Ruta para editar una persona existente
router.get("/edit/:id", async (req, res) => {
try {
const { id } = req.params;

// Ejemplo de obtención de una persona para editar
// Aquí deberías obtener la persona con el ID especificado de la base de datos 

utilizando pool.query()
} catch (err) {
res.status(500).json({ message: err.message });
}
});

router.post("/edit/:id", async (req, res) => {
try {

// Desestructuramos directamente los campos del cuerpo de la solicitud

const { campo1, campo2, campo3, campo4 } = req.body;
const { id } = req.params;
const editPersona = { campo1, campo2, campo3, campo4 };

// Ejemplo de actualización de una persona en la base de datos
// Aquí deberías realizar la actualización en la base de datos utilizando pool.

query()
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// Ruta para eliminar una persona

router.get("/delete/:id", async (req, res) => {
try {
const { id } = req.params;

// Ejemplo de eliminación de una persona de la base de datos
// Aquí deberías realizar la eliminación en la base de datos utilizando pool.

query()
} catch (err) {
res.status(500).json({ message: err.message });
}
});

// Ruta para obtener la lista de personas
router.get("/list", async (req, res) => {
try {

// Ejemplo de obtención de todas las personas de la base de datos

const result = await pool.query("SELECT \* FROM tu_base_de_datos");
const personas = result[0];

// Obtenemos los datos de las personas
// Renderizamos la vista "list" y pasamos los datos obtenidos como contexto

res.render("personas/list", { personas });
} catch (err) {
res.status(500).json({ message: err.message });
}
});

export default router;
```
---

***EJEMPLOS:***

- #### **Landing Page**

![Landing Page](/Proyecto-Escuela/src/public/img/Landing.jpg)

- #### **Create Page**

![Create Page](/Proyecto-Escuela/src/public/img/create.jpg)

- #### **List Page**

![List Page](/Proyecto-Escuela/src/public/img/listPage.jpg)

- #### **Edit Page**

![Edit Page](/Proyecto-Escuela/src/public/img/EditPage.jpg)

-------

### *En este código, hemos agregado las rutas para agregar, editar, eliminar y listar personas, con ejemplos básicos de cómo manejar las solicitudes y respuestas para cada operación. Recuerda reemplazar los nombres de los campos y las consultas SQL con los nombres reales de tu base de datos. Si necesitas más ayuda o tienes alguna otra pregunta, no dudes en decírmelo.*

**Mucha suerte y a trabajar!!**