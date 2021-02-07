# build React app
FROM node:15.8.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM ruby:3.0
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

COPY Gemfile Gemfile.lock /app/
RUN bundle install

RUN rm -rf /public/static
COPY --from=build /app/build/* /public

COPY . /app/

EXPOSE 3000

CMD ["bundle", "exec", "rails", "server", "--port", "3000", "--binding", "0.0.0.0"]
