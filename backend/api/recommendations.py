from fastapi import APIRouter

from models.schemas import RecommendationResponse
from services.recommendation_service import get_recommendations

router = APIRouter(prefix="/recommendations", tags=["Recommendation API"])


@router.get("", response_model=RecommendationResponse)
def recommendations() -> RecommendationResponse:
    return get_recommendations()
