.PHONY: help install dev build start test lint clean docker-up docker-down docker-build

help:
	@echo "ReactTailwindAccessKit - Makefile Commands"
	@echo ""
	@echo "Available commands:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build      - Build for production"
	@echo "  make start      - Start production server"
	@echo "  make test      - Run tests"
	@echo "  make lint      - Run ESLint"
	@echo "  make clean     - Clean build artifacts"
	@echo "  make docker-up  - Start Docker containers"
	@echo "  make docker-down - Stop Docker containers"
	@echo "  make docker-build - Build Docker images"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

test:
	npm test

lint:
	npm run lint

clean:
	rm -rf .next
	rm -rf node_modules
	rm -rf coverage

docker-up:
	docker-compose up --build

docker-down:
	docker-compose down

docker-build:
	docker-compose build