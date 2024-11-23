import os

from src.config.settings import RootSettings

ENV_FILE = os.environ.get("ENV_FILE") if os.environ.get("ENV_FILE") else ".env"

settings = RootSettings(_env_file='.env')
