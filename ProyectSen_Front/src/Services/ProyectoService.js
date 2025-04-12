import api from "../api/AxiosConfig";

// ✅ Obtener todos los proyectos
const listProyectos = async () => {
    try {
        const { data, status } = await api.get(`/proyectos/`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al listar los proyectos:", error);
        throw error;
    }
};

// ✅ Agregar un nuevo proyecto (POST)
const addProyecto = async (proyecto) => {
    try {
        const { data, status } = await api.post(`/proyectos/`, proyecto);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error("Error al agregar el proyecto:", error);
        throw error;
    }
};

// ✅ Actualizar proyecto existente (PUT)
const updateProyecto = async (id, proyecto) => {
    try {
        const { data, status } = await api.put(`/proyectos/${id}`, proyecto);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error(`Error al actualizar el proyecto con ID ${id}:`, error);
        throw error;
    }
};

// ✅ Eliminar un proyecto (DELETE)
const deleteProyecto = async (id) => {
    try {
        const { data, status } = await api.delete(`/proyectos/${id}`);
        if (status === 200) {
            return data;
        }
    } catch (error) {
        console.error(`Error al eliminar el proyecto con ID ${id}:`, error);
        throw error;
    }
};

export {
    listProyectos,
    addProyecto,
    updateProyecto,
    deleteProyecto
};
