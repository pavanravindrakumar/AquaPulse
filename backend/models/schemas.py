from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class SensorReading(BaseModel):
    name: str
    value: str
    unit: str
    status: str
    trend: str
    updated_at: datetime


class SensorOverviewItem(BaseModel):
    label: str
    value: str
    detail: str


class SensorDashboardResponse(BaseModel):
    overview: list[SensorOverviewItem]
    live_sensors: list[SensorReading]
    water_quality_metrics: list[SensorOverviewItem]
    recent_activity: list[str]


class PredictionInput(BaseModel):
    pond_id: str = Field(..., examples=["Pond 4"])
    temperature_c: float = Field(..., examples=[28.4])
    ph_level: float = Field(..., examples=[7.6])
    dissolved_oxygen_mg_l: float = Field(..., examples=[6.8])
    turbidity_ntu: float = Field(..., examples=[18.0])


class PredictionResponse(BaseModel):
    pond_id: str
    result: str
    confidence_score: int
    risk_level: Literal["Low", "Medium", "High"]
    recommendation: str
    explanation: str
    generated_at: datetime


class RecommendationItem(BaseModel):
    title: str
    description: str
    priority: Literal["Low", "Medium", "High"]


class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]
    next_actions: list[str]
    generated_at: datetime


class AlertItem(BaseModel):
    level: Literal["Critical", "Warning", "Info"]
    title: str
    time: str
    acknowledged: bool = False


class AlertResponse(BaseModel):
    open_alerts: int
    critical_alerts: int
    alerts: list[AlertItem]


class HealthResponse(BaseModel):
    status: str
    uptime: str
    version: str
    timestamp: datetime
    services: dict[str, str]
