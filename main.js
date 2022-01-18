const express = require ("express");
const router = require("./routes/products.js");
const app = express();
const router_products = require("./routes/products");
const serverPort = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/products", router_products);
app.listen(serverPort, () => {
    console.log(`Servidor activo y escuchando en puerto ${serverPort}`);
}).on("error", error => console.log(error.message));
