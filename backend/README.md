# AquaPulse Backend

FastAPI backend architecture for AquaPulse smart aquaculture monitoring.

## Structure

- `api/` - route definitions for Sensor, Prediction, Recommendation, Alerts, and Health APIs
- `models/` - Pydantic schemas
- `services/` - business logic and dummy data adapters
- `utils/` - shared dummy data and future helper modules

## Endpoints

- `GET /` - backend status
- `GET /api/health` - health check
- `GET /api/sensors` - dashboard sensor overview
- `GET /api/sensors/live` - live sensor cards data
- `POST /api/predictions` - prediction response from dummy inputs
- `GET /api/recommendations` - AI-style recommendations
- `GET /api/alerts` - alert summary and alert list

## Run Locally

1. Create a virtual environment.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start the app:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

4. Open:

- `http://127.0.0.1:8000/`
- `http://127.0.0.1:8000/docs`

## Gemini Placeholder

Future Gemini integration is reserved in `services/gemini_service.py` and `.env.example`.
Set `GEMINI_API_KEY` later when the AI provider is connected.
