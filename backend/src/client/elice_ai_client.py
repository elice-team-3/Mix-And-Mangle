import json
import uuid

import httpx

from src.config import settings


class EliceClient:
    def __init__(self):
        self.base_url = settings.client.elice_api_url
        self.token = settings.client.elice_api_key

    async def helpy_chat(self, messages: []):
        url = self.base_url + "/v1/chat/completions"

        payload = {
            "max_tokens": 2048,
            "model": "helpy-pro",
            "sess_id": str(uuid.uuid4()),
            "messages": messages
        }

        headers = {
            "accept": "application/json",
            "content-type": f"application/json",
            "Authorization": f"Bearer {self.token}"
        }
        async with httpx.AsyncClient() as client:
            retry_cnt = 0
            while retry_cnt < 3:
                resp = await client.post(
                    url,
                    json=payload,
                    headers=headers,
                    timeout=60
                )
                if resp.status_code == 200:
                    break

        resp = resp.json()
        content = resp["choices"][0]["message"]["content"]

        return content


def get_elice_client():
    return EliceClient()
