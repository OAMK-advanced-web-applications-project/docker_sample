# Frontend Dockerfile for React/Vite application
#
# To build the image:
# docker build -t docker-sample-frontend .
#
# To run the container:
# docker run -p 5173:5173 docker-sample-frontend
#
# To run with environment variables:
# docker run -p 5173:5173 -e VITE_API_URL=http://localhost:3000 docker-sample-frontend
#
# Access the application at: http://localhost:5173

FROM node:24

WORKDIR /app

# curl is required by the backend health check
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
EXPOSE 5173

CMD ["npm", "run", "dev:web"]