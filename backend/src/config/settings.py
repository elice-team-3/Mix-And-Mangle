from pydantic import Field
from pydantic_settings import BaseSettings as _BaseSettings, SettingsConfigDict


class BaseSettings(_BaseSettings):
    model_config = SettingsConfigDict(extra="ignore")


class AppSettings(BaseSettings):
    cors_allow_origins: str = Field(default="", description="cors allow origins")


class ClientSettings(BaseSettings):
    elice_api_url: str = Field(None, description="Elice ML API url")
    elice_api_key: str = Field(None, description="API key")


class DatabaseSettings(BaseSettings):
    mingle_url: str = Field(None, description="Mingle DB url")


class TestSettings(BaseSettings):
    db_mode: str = Field("local", description="db instance mode")
    db_url: str = Field(None, description="db url")


class RootSettings(BaseSettings):
    model_config = SettingsConfigDict(
        extra="ignore",
        env_nested_delimiter="__",
        env_file_encoding="utf-8",
        env_file=".env",
    )

    app: AppSettings
    client: ClientSettings
    database: DatabaseSettings
    test: TestSettings
