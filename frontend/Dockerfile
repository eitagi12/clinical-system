## Stage 1: Build the react application
FROM node:12.4.0-alpine as build

# Configure the main working directory inside the docker image.
# This is the base directory used in any further RUN, COPY, and ENTRYPOINT
# commands.
WORKDIR /app

# Copy the package.json as well as the package-lock.json and install
# the dependencies. This is a separate step so the dependencies
# will be cached unless changes to one of those two files
# are made.
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts -g

# Copy the main application
COPY . ./

# Arguments
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80

CMD ["npm","start"]