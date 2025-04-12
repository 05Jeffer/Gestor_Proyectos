import { useState, useEffect } from "react";
import { listProyectos, deleteProyecto } from "../../Services/ProyectoService";
import CrearProyecto from "./CrearProyecto";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaSortUp, FaSortDown } from "react-icons/fa";

export default function ProyectosTable() {
  const [proyectos, setProyectos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState(null);
  const [orden, setOrden] = useState({ campo: 'id', direccion: 'asc' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarProyectos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listProyectos();
      const dataOrdenada = ordenarProyectos(data, orden.campo, orden.direccion);
      setProyectos(dataOrdenada);
    } catch (err) {
      setError("Error al cargar los proyectos. Intente nuevamente.");
      console.error("Error al cargar proyectos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const ordenarProyectos = (proyectos, campo, direccion) => {
    return [...proyectos].sort((a, b) => {
      if (campo.includes('fecha')) {
        const fechaA = new Date(a[campo]);
        const fechaB = new Date(b[campo]);
        return direccion === 'asc' ? fechaA - fechaB : fechaB - fechaA;
      }
      
      if (a[campo] < b[campo]) return direccion === 'asc' ? -1 : 1;
      if (a[campo] > b[campo]) return direccion === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const cambiarOrden = (campo) => {
    setOrden(prev => ({
      campo,
      direccion: prev.campo === campo && prev.direccion === 'asc' ? 'desc' : 'asc'
    }));
  };

  useEffect(() => {
    cargarProyectos();
  }, [orden]);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este proyecto?")) {
      try {
        await deleteProyecto(id);
        cargarProyectos();
      } catch (err) {
        setError("Error al eliminar el proyecto");
        console.error("Error al eliminar:", err);
      }
    }
  };

  const handleEditar = (proyecto) => {
    setProyectoEditando(proyecto);
    setMostrarModal(true);
  };

  const handleCrear = () => {
    setProyectoEditando(null);
    setMostrarModal(true);
  };

  const renderIconoOrden = (campo) => {
    if (orden.campo !== campo) return null;
    return orden.direccion === 'asc' ? 
      <FaSortUp className="ml-1" /> : 
      <FaSortDown className="ml-1" />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Gestión de Proyectos</h1>
          <p className="text-gray-400 mt-2">Administra todos los proyectos activos de tu empresa</p>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {/* Tarjeta de contenido */}
        <div className="bg-white text-gray-800 p-8 rounded-xl shadow-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold">Lista de Proyectos</h2>
            <button
              onClick={handleCrear}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 hover:brightness-110 transition duration-300 flex items-center"
            >
              <FaPlus className="mr-2" />
              Crear Proyecto
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : proyectos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay proyectos registrados
            </div>
          ) : (
            <motion.div
              className="overflow-hidden rounded-lg border border-gray-200 shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative max-h-[600px] overflow-y-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                    <tr>
                      <th 
                        className="px-6 py-3 cursor-pointer hover:bg-gray-300"
                        onClick={() => cambiarOrden('id')}
                      >
                        <div className="flex items-center">
                          ID
                          {renderIconoOrden('id')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 cursor-pointer hover:bg-gray-300"
                        onClick={() => cambiarOrden('nombre')}
                      >
                        <div className="flex items-center">
                          Nombre
                          {renderIconoOrden('nombre')}
                        </div>
                      </th>
                      <th className="px-6 py-3">Descripción</th>
                      <th 
                        className="px-6 py-3 cursor-pointer hover:bg-gray-300"
                        onClick={() => cambiarOrden('fecha_inicio')}
                      >
                        <div className="flex items-center">
                          Fecha Inicio
                          {renderIconoOrden('fecha_inicio')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 cursor-pointer hover:bg-gray-300"
                        onClick={() => cambiarOrden('fecha_fin')}
                      >
                        <div className="flex items-center">
                          Fecha Fin
                          {renderIconoOrden('fecha_fin')}
                        </div>
                      </th>
                      <th className="px-6 py-3">Estado</th>
                      <th className="px-6 py-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proyectos.map((p) => (
                      <motion.tr
                        key={p.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="px-6 py-4 font-medium">{p.id}</td>
                        <td className="px-6 py-4">{p.nombre}</td>
                        <td className="px-6 py-4 max-w-xs truncate" title={p.descripcion}>
                          {p.descripcion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {p.fecha_inicio?.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {p.fecha_fin?.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            p.estado === 'Activo' 
                              ? 'bg-green-100 text-green-800' 
                              : p.estado === 'En progreso' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {p.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleEditar(p)}
                              className="bg-yellow-500 text-white px-5 py-1.5 rounded-md flex items-center hover:bg-yellow-400 transition"
                            >
                              <FaEdit className="mr-2" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(p.id)}
                              className="bg-red-600 text-white px-3 py-1.5 rounded-md flex items-center hover:bg-red-500 transition"
                            >
                              <FaTrash className="mr-2" />
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {mostrarModal && (
          <CrearProyecto
            proyectoEditando={proyectoEditando}
            onGuardado={() => {
              cargarProyectos();
              setMostrarModal(false);
            }}
            onCancelar={() => setMostrarModal(false)}
          />
        )}
      </div>
    </div>
  );
}