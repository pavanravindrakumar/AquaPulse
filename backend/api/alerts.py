from fastapi import APIRouter

from models.schemas import AlertResponse
from services.alert_service import get_alerts

router = APIRouter(prefix="/alerts", tags=["Alerts API"])


@router.get("", response_model=AlertResponse)
def alerts() -> AlertResponse:
    return get_alerts()
