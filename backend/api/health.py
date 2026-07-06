from fastapi import APIRouter

from models.schemas import HealthResponse
from services.health_service import get_health_status

router = APIRouter(prefix="/health", tags=["Health API"])


@router.get("", response_model=HealthResponse)
def health() -> HealthResponse:
    return get_health_status()
