"""Placeholder service for future Gemini AI integration."""

from dataclasses import dataclass


@dataclass
class GeminiConfig:
    api_key: str | None = None
    model: str = "gemini-1.5-flash"


class GeminiService:
    def __init__(self, config: GeminiConfig | None = None) -> None:
        self.config = config or GeminiConfig()

    def is_enabled(self) -> bool:
        return bool(self.config.api_key)

    def generate_recommendation(self, prompt: str) -> str:
        raise NotImplementedError(
            "Gemini integration is a placeholder. Provide API credentials and wire the model provider later."
        )
