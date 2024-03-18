CREATE DATABASE IF NOT exists escueladb;

USE escueladb;

CREATE TABLE alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    edad INT,
    curso VARCHAR(50)
);

SELECT * FROM alumnos;