# 🌾 AI-Powered Crop Adviser (Dharti Mitra)

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green)
![React](https://img.shields.io/badge/React-19-blue)
![Docker](https://img.shields.io/badge/Docker-✓-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-✓-blue)
![AWS](https://img.shields.io/badge/AWS_EKS-✓-orange)
![Kafka](https://img.shields.io/badge/Kafka-✓-black)
![Terraform](https://img.shields.io/badge/Terraform-✓-purple)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-blue)

A production-grade, cloud-native AI agriculture advisory platform built with microservices
architecture, deployed on AWS EKS with full CI/CD automation.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Microservices](#-microservices)
- [Tech Stack](#-tech-stack)
- [Infrastructure](#-infrastructure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Docker Setup](#-docker-setup)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Terraform IaC](#-terraform-iac)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

**Dharti Mitra** (Friend of the Earth) is a full-stack, cloud-native AI agriculture advisory
application. Farmers can submit soil analysis requests, receive AI-generated fertilizer
recommendations powered by Google Gemini, interact with a multilingual agriculture chatbot,
and get health card analyses — all in their native Indian language.

The system is deployed on **AWS EKS** with automated deployments via **GitHub Actions CI/CD**,
infrastructure provisioned through **Terraform**, and load-balanced through **AWS Elastic
Load Balancers**.

---

## 🏗️ Architecture

```
                        ┌──────────────────────────────────────────────┐
                        │              AWS EKS Cluster                  │
                        │           (gemini-crop-adviser)               │
                        │                                               │
 User ──► ELB ─────────►│  ┌──────────────┐  ┌─────────────────────┐  │
          (Port 80)     │  │   Frontend   │  │  Agriculture Svc     │  │
                        │  │ React+Nginx  │  │    (Port 8080)       │  │
                        │  └──────────────┘  └─────────────────────┘  │
                        │                                               │
                        │  ┌──────────────┐  ┌─────────────────────┐  │
                        │  │   Producer   │  │     AI Service       │  │
                        │  │  Kafka Svc   │  │  Gemini + ElevenLabs │  │
                        │  │  (Port 8081) │  │    (Port 8082)       │  │
                        │  └──────────────┘  └─────────────────────┘  │
                        │                                               │
                        │  ┌──────────────┐  ┌─────────────────────┐  │
                        │  │    Kafka     │  │       Redis          │  │
                        │  │  (Internal)  │  │    (Internal)        │  │
                        │  └──────────────┘  └─────────────────────┘  │
                        └──────────────────────────────────────────────┘
                                      ▲
                        ┌─────────────┴────────────────┐
                        │    GitHub Actions CI/CD        │
                        │   Build → Push → Deploy        │
                        └──────────────────────────────-─┘
```

---

## 🔧 Microservices

### 1. 🌱 Agriculture Service (Port 8080)
Auth + Farmer management service.

- JWT-based authentication (Access + Refresh tokens)
- OTP verification via Twilio SMS
- Role-based access control (ADMIN, FARMER)
- Redis-based session/token management
- PostgreSQL (Neon) as primary database

### 2. 📡 Producer Service (Port 8081)
Kafka producer — receives soil data from the frontend and publishes to Kafka topic.

- Accepts soil analysis form data (including soil images)
- Publishes to `soil-analysis-topic`
- Multipart file support (up to 10MB)

### 3. 🤖 AI Service (Port 8082)
Core intelligence service — consumes Kafka messages and generates AI recommendations.

- Consumes `soil-analysis-topic` via Kafka
- Google Gemini AI for fertilizer recommendations and soil image analysis
- ElevenLabs TTS for audio responses
- Multilingual support (11 Indian languages)
- Agriculture chatbot endpoint
- Soil health card analysis

### 4. 🌿 Frontend (Port 80)
React SPA served via Nginx.

- Multilingual UI (English + 10 Indian languages)
- Soil analysis form with image upload
- Agriculture chatbot with voice support
- Weather widget integration
- Crop advisory pages

---

## 💻 Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Java 17 | Core programming language |
| Spring Boot 3.x | Microservices framework |
| Spring Kafka | Async messaging |
| Spring Security + JWT | Authentication & authorization |
| Spring Data Redis | Token caching, OTP storage |
| Firebase / PostgreSQL (Neon) | Database |
| Google Gemini AI | Soil & fertilizer analysis |
| ElevenLabs TTS | Text-to-speech for responses |
| Twilio | SMS OTP delivery |
| Lombok | Boilerplate reduction |

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Nginx | Production web server |
| Lucide React | Icon library |
| Tailwind CSS | Styling |

### DevOps & Infrastructure

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Local multi-container orchestration |
| Kubernetes | Container orchestration |
| AWS EKS | Managed Kubernetes on AWS |
| AWS ELB | Load balancing (4 LoadBalancers) |
| GitHub Actions | CI/CD pipeline |
| Terraform | Infrastructure as Code |
| Apache Kafka | Event streaming |
| Redis | Caching & OTP storage |

---

## 🏗️ Infrastructure

### AWS EKS Setup

| Property | Value |
|---|---|
| Cluster | `gemini-crop-adviser` |
| Region | `ap-south-1` (Mumbai) |
| Node Type | `m7i-flex.large` (2 vCPU, 4GB RAM) |
| Node Count | 2 nodes (auto-scales 1–3) |
| Kubernetes Version | 1.30 |

### Load Balancers (AWS ELB)

Each service gets its own AWS Elastic Load Balancer:

| Service | Port | Type |
|---|---|---|
| Frontend | 80 | Public LoadBalancer |
| Agriculture Service | 8080 | Public LoadBalancer |
| Producer Service | 8081 | Public LoadBalancer |
| AI Service | 8082 | Public LoadBalancer |

### Kubernetes Resources

- **Namespace:** `gemini-crop-adviser`
- **Deployments:** 4 (one per service)
- **Services:** 4 LoadBalancer services
- **ConfigMaps:** 1 (shared non-secret config)
- **Secrets:** 1 (`gemini-secrets`)

---

## 🚀 Getting Started

### Prerequisites

```bash
# Required
Java 17+
Maven 3.9+
Node.js 20+
Docker Desktop
Git

# For cloud deployment
AWS CLI
kubectl
Terraform >= 1.3.0
```

### Clone the Repository

```bash
git clone https://github.com/Ubaid-Rza-08/deploy-Ai-powered-crop-adviser-backend.git
cd deploy-Ai-powered-crop-adviser-backend
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```env
# Kafka
SPRING_KAFKA_BOOTSTRAP_SERVERS=kafka:19092

# Redis
SPRING_DATA_REDIS_HOST=redis
SPRING_DATA_REDIS_PORT=6379

# PostgreSQL (Neon)
DB_URL=jdbc:postgresql://<host>/<db>?sslmode=require&channel_binding=require
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret_min_64_chars
JWT_ACCESS_TOKEN_MS=3600000
JWT_REFRESH_TOKEN_MS=604800000

# Twilio
TWILIO_PHONE_NUMBER=+1xxxxxxxxxx
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent

# ElevenLabs TTS
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_API_URL=https://api.elevenlabs.io/v1
ELEVENLABS_VOICE_ID=your_voice_id
```

---

## 🐳 Docker Setup

### Run Locally with Docker Compose

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down
```

### Services available at:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Agriculture Service | http://localhost:8080 |
| Producer Service | http://localhost:8081 |
| AI Service | http://localhost:8082 |

### Build & Push Images to Docker Hub

```bash
docker compose build

docker push ubaidrza/gemini-agriculture:latest
docker push ubaidrza/gemini-producer:latest
docker push ubaidrza/gemini-ai-service:latest
docker push ubaidrza/gemini-frontend:latest
```

---

## ☸️ Kubernetes Deployment

### Option 1 — Using Terraform (Recommended)

```bash
cd terraform/

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Create EKS cluster (~15 minutes)
terraform apply

# Connect kubectl
aws eks update-kubeconfig --region ap-south-1 --name gemini-crop-adviser
```

### Option 2 — Using eksctl

```bash
eksctl create cluster \
  --name gemini-crop-adviser \
  --region ap-south-1 \
  --node-type m7i-flex.large \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --managed

aws eks update-kubeconfig --region ap-south-1 --name gemini-crop-adviser
```

### Deploy all services

```bash
kubectl apply -f k8s/common/
kubectl apply -f k8s/agriculture/
kubectl apply -f k8s/producer/
kubectl apply -f k8s/ai-service/
kubectl apply -f k8s/frontend/

# Check status
kubectl get pods -n gemini-crop-adviser
kubectl get svc -n gemini-crop-adviser
```

### Kubernetes Folder Structure

```
k8s/
├── common/
│   ├── namespace.yml
│   ├── configmap.yml
│   └── secrets-template.txt
├── agriculture/
│   ├── deployment.yml
│   └── service.yml
├── producer/
│   ├── deployment.yml
│   └── service.yml
├── ai-service/
│   ├── deployment.yml
│   └── service.yml
└── frontend/
    ├── deployment.yml
    └── service.yml
```

---

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflow

Every `git push` to `main` automatically:

```
Push to main
     │
     ▼
┌──────────────────────────┐
│   Build & Push Images     │
│  ┌──────────────────┐    │
│  │ Build agriculture │    │
│  │ Build producer    │    │
│  │ Build ai-service  │    │
│  │ Build frontend    │    │
│  └──────────────────┘    │
│   Push to Docker Hub      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│    Deploy to EKS          │
│  ┌──────────────────┐    │
│  │ Configure AWS     │    │
│  │ Apply ConfigMap   │    │
│  │ Apply Secrets     │    │
│  │ Deploy Services   │    │
│  │ Wait for Rollout  │    │
│  │ Print Live URLs   │    │
│  └──────────────────┘    │
└──────────────────────────┘
```

### Required GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Docker Hub username |
| `DOCKER_PASSWORD` | Docker Hub password |
| `AWS_ACCESS_KEY_ID` | AWS IAM access key |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key |
| `DB_URL` | Neon PostgreSQL connection URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | JWT signing secret (64+ chars) |
| `TWILIO_PHONE_NUMBER` | Twilio phone number |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `GEMINI_API_KEY` | Google Gemini API key |
| `ELEVENLABS_API_KEY` | ElevenLabs API key |
| `ELEVENLABS_VOICE_ID` | ElevenLabs voice ID |

---

## 🏗️ Terraform IaC

The `terraform/` directory provisions the entire AWS EKS cluster.

```
terraform/
├── main.tf           ← VPC + EKS cluster + Node Group + IAM
├── variables.tf      ← Configurable inputs
├── outputs.tf        ← Cluster endpoint, kubeconfig command
└── terraform.tfvars  ← Your values (gitignored)
```

```bash
# Deploy infrastructure
terraform init
terraform plan
terraform apply

# Destroy everything (stop AWS charges)
terraform destroy
```

---

## 📁 Project Structure

```
deploy-Ai-powered-crop-adviser-backend/
├── .github/
│   └── workflows/
│       └── ci-cd-eks.yml           ← GitHub Actions pipeline
│
├── Agriculture/                    ← Auth + Farmer service (Port 8080)
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── producer/                       ← Kafka producer service (Port 8081)
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── ai-service/                     ← AI + Kafka consumer service (Port 8082)
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── pom.xml
│
├── dharti-mitra-frontend/          ← React frontend (Port 80/3000)
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── k8s/                            ← Kubernetes manifests
│   ├── common/
│   ├── agriculture/
│   ├── producer/
│   ├── ai-service/
│   └── frontend/
│
├── terraform/                      ← Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars
│
├── docker-compose.yml              ← Local development
├── .env                            ← Environment variables (gitignored)
├── .env.example                    ← Template for .env
├── .gitignore
└── README.md
```

---

## 🔒 Security

- JWT access tokens (1 hour expiry) + refresh tokens (7 days)
- Spring Security with role-based access control
- All sensitive values stored in GitHub Secrets / K8s Secrets
- `.env` is gitignored — never committed
- Kubernetes secrets injected at deploy time via CI/CD

---

## 👨‍💻 Author

**Mo. Ubaid Rza** — Java/Spring Boot Developer

- GitHub: [@Ubaid-Rza-08](https://github.com/Ubaid-Rza-08)
