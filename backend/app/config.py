"""Environment configuration with secret-safe representations."""

from typing import Literal

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    openai_api_key: SecretStr | None = None
    openai_model: str = "gpt-5.6"
    model_adapter: Literal["fake", "openai"] = "openai"
    database_url: str = "sqlite:///./demo.db"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
