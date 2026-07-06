from datetime import datetime, timezone

from models.schemas import HealthResponse


def get_health_status() -> HealthResponse:
    return HealthResponse(
        status="ok",
        uptime="72h 18m",
        version="0.1.0",
        timestamp=datetime.now(timezone.utc),
        services={
            "api": "healthy",
            "sensor_pipeline": "healthy",
            "prediction_engine": "mock-ready",
            "gemini_integration": "placeholder",
        },
    )
