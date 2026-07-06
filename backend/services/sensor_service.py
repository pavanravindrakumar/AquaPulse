from datetime import datetime, timezone

from models.schemas import SensorDashboardResponse, SensorOverviewItem, SensorReading
from utils.dummy_data import DASHBOARD_OVERVIEW, LIVE_SENSOR_READINGS, RECENT_ACTIVITY, WATER_QUALITY_METRICS


def get_dashboard_data() -> SensorDashboardResponse:
    return SensorDashboardResponse(
        overview=[SensorOverviewItem(**item) for item in DASHBOARD_OVERVIEW],
        live_sensors=[SensorReading(**item) for item in LIVE_SENSOR_READINGS],
        water_quality_metrics=[SensorOverviewItem(**item) for item in WATER_QUALITY_METRICS],
        recent_activity=list(RECENT_ACTIVITY),
    )


def get_live_sensor_readings() -> list[SensorReading]:
    return [SensorReading(**item) for item in LIVE_SENSOR_READINGS]
