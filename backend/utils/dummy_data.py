from datetime import datetime, timezone

DASHBOARD_OVERVIEW = [
    {"label": "Active Ponds", "value": "12", "detail": "3 under watch"},
    {"label": "Healthy Readings", "value": "91%", "detail": "Last 24 hours"},
    {"label": "Open Alerts", "value": "4", "detail": "2 critical"},
]

LIVE_SENSOR_READINGS = [
    {
        "name": "Temperature",
        "value": "28.4°C",
        "unit": "C",
        "status": "Stable",
        "trend": "+0.3°C",
        "updated_at": datetime.now(timezone.utc),
    },
    {
        "name": "pH Level",
        "value": "7.6",
        "unit": "pH",
        "status": "Optimal",
        "trend": "+0.1",
        "updated_at": datetime.now(timezone.utc),
    },
    {
        "name": "Dissolved Oxygen",
        "value": "6.8 mg/L",
        "unit": "mg/L",
        "status": "Healthy",
        "trend": "+0.2",
        "updated_at": datetime.now(timezone.utc),
    },
    {
        "name": "Turbidity",
        "value": "18 NTU",
        "unit": "NTU",
        "status": "Watch",
        "trend": "+3 NTU",
        "updated_at": datetime.now(timezone.utc),
    },
]

WATER_QUALITY_METRICS = [
    {"label": "Temperature Index", "value": "88/100", "detail": "Within target range"},
    {"label": "Water Clarity", "value": "74/100", "detail": "Minor sediment increase"},
    {"label": "Oxygen Balance", "value": "92/100", "detail": "Strong overnight recovery"},
]

RECENT_ACTIVITY = [
    "Sensor hub synced successfully",
    "Auto-aeration activated for Pond 4",
    "Daily health report generated",
    "Operator acknowledged warning alert",
]
