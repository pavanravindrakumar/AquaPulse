from datetime import datetime, timezone
import os
import joblib

from models.schemas import PredictionInput, PredictionResponse

# Load the trained model
MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "dristhi_water_quality_model.pkl"
)

model = joblib.load(MODEL_PATH)
print("Model path:", MODEL_PATH)
print("Expected features:", model.n_features_in_)
print("Model loaded:", model)


def get_prediction(payload: PredictionInput) -> PredictionResponse:
    # Prepare input in the same order used during training
    features = [[
        payload.temperature_c,
        payload.ph_level,
        payload.dissolved_oxygen_mg_l,
        payload.turbidity_ntu
    ]]

    # Predict water quality
    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0] 
    confidence_score = int(round(max(probabilities) * 100))
    print("INPUT FEATURES:", features)
    print("MODEL PREDICTION:", prediction)
    print("MODEL PROBABILITIES:", probabilities)
    print("CONFIDENCE:", confidence_score)

    # Map prediction to response
    if prediction == 0:
        risk_level = "Low"
        result = "Good Water Quality"
        recommendation = "Continue normal pond monitoring."
        

    elif prediction == 1:
        risk_level = "Medium"
        result = "Moderate Water Quality"
        recommendation = "Monitor pond closely and reduce feeding if necessary."
        

    else:
        risk_level = "High"
        result = "Poor Water Quality"
        recommendation = "Increase aeration immediately and inspect the pond."
        

    return PredictionResponse(
        pond_id=payload.pond_id,
        result=result,
        confidence_score=confidence_score,
        risk_level=risk_level,
        recommendation=recommendation,
        explanation="Prediction generated using the trained Random Forest model.",
        generated_at=datetime.now(timezone.utc),
    )