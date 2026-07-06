from fastapi import APIRouter

from models.schemas import SensorDashboardResponse, SensorReading
from services.sensor_service import get_dashboard_data, get_live_sensor_readings

router = APIRouter(prefix="/sensors", tags=["Sensor API"])


@router.get("", response_model=SensorDashboardResponse)
def read_sensor_dashboard() -> SensorDashboardResponse:
    return get_dashboard_data()


@router.get("/live", response_model=list[SensorReading])
def read_live_sensors() -> list[SensorReading]:
    return get_live_sensor_readings()
