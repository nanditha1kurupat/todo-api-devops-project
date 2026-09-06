# To-Do List API

A simple REST API built with Flask, containerized with Docker, as part of my hands-on DevOps learning journey.

## Features
- GET /tasks — list all tasks
- POST /tasks — add a new task
- PUT /tasks/<id> — mark a task as done
- DELETE /tasks/<id> — remove a task
- GET /health — health check endpoint (used for container monitoring)

## Tech Stack
- Python + Flask
- Docker

## How to run locally
\`\`\`
pip install -r requirements.txt
python app.py
\`\`\`

## How to run with Docker
\`\`\`
docker build -t todo-api .
docker run -p 80:80 todo-api
\`\`\`

## Next steps
- Deploy to Kubernetes
- Add CI/CD pipeline with GitHub Actions
- Provision AWS infrastructure with Terraform