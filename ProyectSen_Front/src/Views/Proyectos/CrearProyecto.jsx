import { useState, useEffect } from "react";
import { addProyecto, updateProyecto } from "../../Services/ProyectoService";
import { motion, AnimatePresence } from "framer-motion";

export default function CrearProyecto({ proyectoEditando, onGuardado, onCancelar }) {
    const [proyecto, setProyecto] = useState({
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin: "",
        estado: "",
    });

    useEffect(() => {
        if (proyectoEditando) {
            setProyecto({
                nombre: proyectoEditando.nombre,
                descripcion: proyectoEditando.descripcion,
                fecha_inicio: proyectoEditando.fecha_inicio?.slice(0, 10),
                fecha_fin: proyectoEditando.fecha_fin?.slice(0, 10),
                estado: proyectoEditando.estado,
            });
        }
    }, [proyectoEditando]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProyecto({ ...proyecto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (proyectoEditando) {
            await updateProyecto(proyectoEditando.id, proyecto);
        } else {
            await addProyecto(proyecto);
        }
        onGuardado();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-2xl relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, type: "spring" }}
                >
                    <button
                        onClick={onCancelar}
                        className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                    >
                        &times;
                    </button>
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        {proyectoEditando ? "Editar Proyecto" : "Crear Proyecto"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={proyecto.nombre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={proyecto.descripcion}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="date"
                            name="fecha_inicio"
                            value={proyecto.fecha_inicio}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <input
                            type="date"
                            name="fecha_fin"
                            value={proyecto.fecha_fin}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <select
                            name="estado"
                            value={proyecto.estado}
                            onChange={handleChange}
                            className="w-full border bg-border-gray-900  border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="" disabled>
                                Selecciona un estado
                            </option>
                            <option value="Activo" className="text-gray-900">Activo</option>
                            <option value="Inactivo" className="text-gray-900">Inactivo</option>
                            <option value="Completado" className="text-gray-900">Completado</option>
                            <option value="Pendiente" className="text-gray-900">Pendiente</option>
                        </select>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                {proyectoEditando ? "Actualizar" : "Crear"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
