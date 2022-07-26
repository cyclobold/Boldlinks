FROM node:13-alpine3.10
RUN mkdir -p /home/simple
COPY . /home/simple
WORKDIR /home/simple
RUN npm install
# ENV PORT 4300
# ARG PORT 4300
EXPOSE 4300
CMD ["npm", "start"]
