# Sample Web App — Repo2Docker Pipeline Test

A minimal two-component application for testing a CI/CD pipeline that expects `backend/` and `frontend/` directories, each with a Dockerfile.

## Structure

```text
sample-web-app/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── app/main.py
│   └── tests/test_main.py
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── package-lock.json
    ├── build.js
    ├── index.html
    └── src/main.js, style.css
```

## Backend tests

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m pytest tests/
python -m compileall app
```

## Build images from the repository root

```bash
docker build -t sample-web-app-backend ./backend
docker build -t sample-web-app-frontend ./frontend
```

The frontend Nginx config proxies `/api/` and `/health` to the Kubernetes Service `repo2docker-backend:8000`. This DNS name is intended for the deployed Kubernetes environment.

## Jenkins compatibility

- Backend test stage should execute inside `backend/`.
- Frontend build gate should execute inside `frontend/` using `npm ci && npm run build`.
- Docker build contexts should be `backend` and `frontend`.
- Your current deployment stage expects `charts/repo2docker` to exist in the Jenkins workspace. That chart is a platform deployment dependency and should be supplied by the Repo2Docker platform, not by each submitted app repository.
