FROM node:18-alpine as build-stage

# Create a user with the specified UID and assign it to a group with the specified GID
RUN addgroup --gid 9001 appGroup && \
    adduser --system --disabled-password --uid 9001 --ingroup appGroup appUser

# Change ownership of the application directory to the new user and group
#RUN chown -R appUser:appGroup /usr/src/app

# Change ownership of the target directory
RUN mkdir -p /usr/src/app && \
    chown -R appUser:appGroup /usr/src/app 
#Change to user
USER appUser

# Create app directory
WORKDIR /usr/src/app
#RUN chmod 777 /usr/src/app/* 
COPY --chown=appUser:node package*.json ./
#COPY package*.json .
RUN npm install
COPY --chown=appUser:node . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"] 
