# Use node.js image
FROM node:18

# Set working directory
WORKDIR /src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["node", "dist/app.js"]
