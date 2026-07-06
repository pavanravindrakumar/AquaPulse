from models.schemas import AlertItem, AlertResponse


def get_alerts() -> AlertResponse:
    alerts = [
        AlertItem(level="Critical", title="Oxygen drop in Pond 4", time="5 min ago"),
        AlertItem(level="Warning", title="pH drift detected in Pond 2", time="18 min ago"),
        AlertItem(level="Info", title="Feeding cycle completed for Pond 7", time="42 min ago"),
    ]

    critical_alerts = sum(1 for alert in alerts if alert.level == "Critical")

    return AlertResponse(
        open_alerts=len(alerts),
        critical_alerts=critical_alerts,
        alerts=alerts,
    )
