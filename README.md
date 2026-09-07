# To-Do List API

A REST API built with Flask, containerized with Docker, and deployed on Kubernetes — built as a hands-on DevOps learning project.

## Features
- GET /tasks — list all tasks
- POST /tasks — add a new task
- PUT /tasks/<id> — mark a task as done
- DELETE /tasks/<id> — remove a task
- GET /health — health check endpoint (used for Kubernetes liveness monitoring)

## Tech Stack
- Python + Flask
- Docker
- Kubernetes

## Architecture
Client → Kubernetes Service (NodePort) → Deployment (2 replicas, self-healing) → Flask App

## How to run locally
pip install -r requirements.txt
python app.py

## How to run with Docker
docker build -t todo-api .
docker run -p 80:80 todo-api

## How to run on Kubernetes
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl get services

## API Usage Examples

Get all tasks: GET /tasks

Add a task: POST /tasks with body {"title": "Learn Docker"}

Mark a task done: PUT /tasks/1

Delete a task: DELETE /tasks/1

## What this project demonstrates
- Building and testing a REST API from scratch
- Containerizing an application with Docker
- Deploying to Kubernetes with self-healing (2 replicas, auto-restart on failure)
- Exposing services via NodePort
- Tested end-to-end with Postman across all environments (local, Docker, Kubernetes)

## Next steps
- Automate builds with GitHub Actions (CI/CD)
- Provision cloud infrastructure with Terraform
- Deploy to a real cloud Kubernetes cluster (AWS EKS)
- Add monitoring with Prometheus and Grafana

## Author
Nanditha k — built as part of an 8-week DevOps/Cloud learning sprint alongside MCA studies.