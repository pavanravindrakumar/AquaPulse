from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.alerts import router as alerts_router
from api.health import router as health_router
from api.predictions import router as predictions_router
from api.recommendations import router as recommendations_router
from api.sensors import router as sensors_router

app = FastAPI(
    title="AquaPulse Backend",
    version="0.1.0",
    description="FastAPI backend architecture for AquaPulse smart aquaculture monitoring.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(sensors_router, prefix="/api")
app.include_router(predictions_router, prefix="/api")
app.include_router(recommendations_router, prefix="/api")
app.include_router(alerts_router, prefix="/api")


@app.get("/", tags=["Root"])
def root() -> dict:
    return {
        "message": "AquaPulse backend is running",
        "docs": "/docs",
        "health": "/api/health",
    }
