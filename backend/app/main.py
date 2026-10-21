from fastapi import FastAPI

app = FastAPI(title="Sample Web App API", version="1.0.0")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/message")
def get_message():
    return {"message": "Hello from the sample backend!"}
