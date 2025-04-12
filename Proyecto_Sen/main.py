from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import asyncpg
import os
from dotenv import load_dotenv
from contextlib import asynccontextmanager

#venv\Scripts\activate
#uvicorn main:app --reload

# Cargar variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Modelo del proyecto
class Proyecto(BaseModel):
    nombre: str
    descripcion: str
    fecha_inicio: datetime
    fecha_fin: datetime
    estado: str

# Conexión global
conn = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global conn
    conn = await asyncpg.connect(DATABASE_URL, ssl="require")
    print("✅ Conexión a Supabase establecida")
    yield
    await conn.close()
    print("🔌 Conexión cerrada")

# Inicializar FastAPI con el lifespan
app = FastAPI(lifespan=lifespan)

# 🚨 Middleware CORS para permitir peticiones del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o ["*"] para todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoints
@app.get("/proyectos")
async def listar_proyectos():
    rows = await conn.fetch("SELECT * FROM proyectos")
    return [dict(row) for row in rows]

@app.post("/proyectos")
async def agregar_proyecto(proyecto: Proyecto):
    await conn.execute(
        "INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES ($1, $2, $3, $4, $5)",
        proyecto.nombre, proyecto.descripcion, proyecto.fecha_inicio, proyecto.fecha_fin, proyecto.estado
    )
    return {"mensaje": "Proyecto agregado correctamente"}

@app.put("/proyectos/{id}")
async def actualizar_proyecto(id: int, proyecto: Proyecto):
    result = await conn.execute(
        "UPDATE proyectos SET nombre=$1, descripcion=$2, fecha_inicio=$3, fecha_fin=$4, estado=$5 WHERE id=$6",
        proyecto.nombre, proyecto.descripcion, proyecto.fecha_inicio, proyecto.fecha_fin, proyecto.estado, id
    )
    if result == "UPDATE 0":
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return {"mensaje": f"Proyecto con ID {id} actualizado"}

@app.delete("/proyectos/{id}")
async def eliminar_proyecto(id: int):
    result = await conn.execute("DELETE FROM proyectos WHERE id=$1", id)
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return {"mensaje": f"Proyecto con ID {id} eliminado"}
