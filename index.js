import express from "express";

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
