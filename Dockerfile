# Use Node base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["node", "index.js"]