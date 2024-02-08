# Setting working version
FROM node:20-alpine

# Set the working directory to the application folder
WORKDIR /app

# Copy package*.json
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Expose the port on which the application will be listening
EXPOSE 3000

# Command to run the application when the container starts
CMD ["npm", "run", "dev"]