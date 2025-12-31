# Use Node.js official image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the service account key (ensure this file exists in your project root)
COPY serviceAccountKey.json ./

# Expose the port
EXPOSE 5000

# Run the development server
CMD ["npm", "run", "dev"]
