FROM mcr.microsoft.com/playwright
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .