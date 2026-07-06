from fastapi import APIRouter

from models.schemas import PredictionInput, PredictionResponse
from services.prediction_service import get_prediction

router = APIRouter(prefix="/predictions", tags=["Prediction API"])


@router.post("", response_model=PredictionResponse)
def predict(payload: PredictionInput) -> PredictionResponse:
    return get_prediction(payload)
