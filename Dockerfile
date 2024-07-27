
FROM node:21.7.3

# Set the work directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm instal

# Copy the rest of the app file
COPY . .

# Copy .env file
COPY .env .env

# Expose the port 
EXPOSE 8000

# Start the app
CMD ["npm", "start"]


