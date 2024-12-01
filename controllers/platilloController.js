const jwt = require("jsonwebtoken");
const config = require("../config/global");
const Platillo = require("../models/Platillo");

exports.crearPlatillo = async (req, res) => {
    try {
        const { nombre, ingredientes, precio, imagen } = req.body;

        if (!nombre || !ingredientes || !precio || !imagen) return res.status(400).json({ message: "Faltan datos: (nombre,ingredientes,precio,imagen)" })

        const platillo = new Platillo({ nombre, ingredientes, precio, imagen })



        const token = jwt.sign({ id: platillo._id }, config.secret, {
            expiresIn: 60 * 60 * 24

        });
        await platillo.save();

        res.json({
            mensaje: "Platillo creado exitosamente",
            auth: true,
            platillo: {
                id: platillo._id,
                nombre: platillo.nombre,
                ingredientes: platillo.ingredientes,
                precio: platillo.precio,
                imagen: platillo.imagen
            },
            token
        })


    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)

    }
}

exports.obtenerPlatillo = async (req, res) => {
    try {
        const { id } = req.params;

        const platillo = await Platillo.findById(id);

        if (!platillo) return res.status(404).send("Platillo no encontrado");
        res.json({
            mensaje: "Detalle del platillo",
            platillo: {
                id: platillo._id,
                nombre: platillo.nombre,
                ingredientes: platillo.ingredientes,
                precio: platillo.precio,
                imagen: platillo.imagen

            }
        })


    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)

    }
}
exports.actualizarPlatillo = async (req, res) => {

    try {
        const { id, nombre, ingredientes, precio, imagen } = req.body;
        if (!id) {
            return res.status(404).send("El Id es Obligatorio")
        }


        const platillo = await Platillo.findByIdAndUpdate(id,
            { nombre, ingredientes, precio, imagen }, { new: true });

        if (!platillo) return res.status(404).send("platillo no encontrado")

        res.json({
            mensaje: "platillo actualizado con exito",
            platillo: {
                id: platillo._id,
                nombre: platillo.nombre,
                ingredientes: platillo.ingredientes,
                precio: platillo.precio,
                imagen: platillo.imagen
            }
        })

    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)
    }

}

exports.eliminarPlatillo = async (req, res) => {
    try {
        const { id } = req.params;
        const platillo = await Platillo.findByIdAndDelete(id);
        if (!platillo) return res.status(404).send("Platillo no encontrado");
        res.status(200).send(`Platillo eliminado con exito`)

    } catch (error) {
        res.status(500).send(`Hubo un error ${error.message}`);
        console.log(error)
    }
}