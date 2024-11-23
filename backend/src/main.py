import uvicorn
from src.app import create_app

sio_app = create_app()

if __name__ == "__main__":

    # FastAPI 초기화
    uvicorn.run(sio_app, host="0.0.0.0", port=5000)