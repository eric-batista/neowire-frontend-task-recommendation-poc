/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        TASK_API_URL: "http://localhost:8080", // API do Golang
        RECOMMENDATION_API_URL: "http://127.0.0.1:8000", // API do Python FastAPI
    }
};

export default nextConfig;
