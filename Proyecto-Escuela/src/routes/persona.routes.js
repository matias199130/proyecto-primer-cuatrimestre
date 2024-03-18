import { Router } from "express";
import pool from "../database.js";

// Configuración de la sesión

const router = Router();

router.get("/add", (req, res) => {
  res.render("personas/add")
  console.log(res.render("personas/add"));
  
});

router.post("/add", async (req, res) => {
  try {
    const { nombre, apellido, edad, curso } = req.body;
    const newPersona = {
      nombre,
      apellido,
      edad,
      curso,
    };
    await pool.query("INSERT INTO alumnos SET ?", [newPersona]);
    req.session.successMessage = '¡Operación exitosa!'; // Mensaje a mostrar en caso de que se haya realizado correctamente
    console.log("Mensaje de éxito:", req.session.successMessage);
    // Redirecciona a la página principal de personas después de enviar el formulario
    res.redirect("/list");
    console.log('Redirigiendo a la ruta /list');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`SELECT * FROM alumnos WHERE ID = ${id}`);
    const personaEdit = result[0];
    res.render("personas/edit", { persona: personaEdit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { nombre, apellido, edad, curso } = req.body;
    const { id } = req.params;
    const editPersona = { nombre, apellido, edad, curso };
    await pool.query("UPDATE alumnos SET ? WHERE ID=?", [editPersona, id]);
    req.flash("success", "Se ha editado la persona con éxito");
    res.redirect("/list");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM alumnos WHERE ID = ?", [id]);
    req.flash("success", "La persona fue eliminada");
    res.redirect("/list");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/list", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM alumnos");
    res.render("personas/list", { personas: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;