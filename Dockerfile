# Version nodejs latest
FROM node:21.7.3

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Copy .env file
COPY .env .env

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
