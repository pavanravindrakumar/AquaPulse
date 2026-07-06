from datetime import datetime, timezone

from models.schemas import RecommendationItem, RecommendationResponse


def get_recommendations() -> RecommendationResponse:
    return RecommendationResponse(
        recommendations=[
            RecommendationItem(
                title="Increase Aeration",
                description="Raise dissolved oxygen levels in Pond 4 during the evening cycle.",
                priority="High",
            ),
            RecommendationItem(
                title="Review Feeding Schedule",
                description="Trim feed volume slightly until water conditions normalize.",
                priority="Medium",
            ),
            RecommendationItem(
                title="Inspect Sensor Health",
                description="Verify turbidity and pH sensors for calibration drift.",
                priority="Low",
            ),
        ],
        next_actions=[
            "Validate live oxygen data in 20 minutes",
            "Log operator response to the current alert",
            "Prepare follow-up prediction after next sensor sync",
        ],
        generated_at=datetime.now(timezone.utc),
    )
