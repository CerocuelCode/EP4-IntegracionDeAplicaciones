const Mesero = require("../models/Mesero");
const jwt = require("jsonwebtoken");
const config = require("../config/global");

exports.crearMesero = async (req, res) => {
    try {
        const { nombre, ape_paterno, ape_materno, telefono, dni, estado } = req.body;
        if (!nombre || !ape_paterno || !ape_materno || !telefono || !dni || !estado) return res.status(400).json({ message: "Todos los datos son obligatorios (Nombre, apellido Paterno y Materno, Telefono, DNI y el estado)" });

        const mesero = new Mesero({ nombre, ape_paterno, ape_materno, telefono, dni, estado })
        const token = jwt.sign({ id: mesero._id }, config.secret, {
            expiresIn: 60 * 60 * 24

        });
        await mesero.save();
        res.json({
            mensaje: "Mesero creado",
            mesero: mesero,
            token
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el mesero" + error.message });
    }
}

exports.obtenerMeseros = async (req, res) => {
    try {

        const meseros = await Mesero.find();
        if (!meseros || meseros.length === 0) {
            return res.status(404).json({ message: "No se encontrado Meseros" });
        }

        res.json({ message: "Lista de meseros", meseros });
    } catch (error) {
        res.status(500).json({ message: `Error al obtener Mesero: ${error.message}` });
    }
};

exports.actualizarMesero = async (req, res) => {
    try {
        const { id } = req.body;
        const { nombre, ape_paterno, ape_materno, telefono, dni, estado } = req.body;

        if (!id) {
            return res.status(400).json({ message: "El ID es obligatorio" });
        }

        const mesero = await Mesero.findByIdAndUpdate(
            id,
            { nombre, ape_paterno, ape_materno, telefono, dni, estado },
            { new: true }
        );

        if (!mesero) {
            return res.status(404).json({ message: "Mesero No encontrado" });
        }

        res.json({ message: "Mesero actualizado exitosamente", mesero });
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar Mesero: ${error.message}` });
    }
};


exports.eliminarMesero = async (req, res) => {
    try {
        const { id } = req.params;

        const mesero = await Mesero.findById(id);
        if (!mesero) {
            return res.status(404).json({ message: "Mesero No encontrado" });
        }

        if (mesero.estado.toLowerCase() === "inactivo") {
            return res.status(400).json({ message: "El Mesero ya esta Inactivo" });
        }
        mesero.estado = "Inactivo";
        await mesero.save();
        res.status(200).json({ message: "Mesero marcado como inactivo", mesero: mesero });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar Mesero: ${error.message}` });
    }
};
