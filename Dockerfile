# build React app
FROM node:15.8.0-alpine as build
WORKDIR /app
COPY client/package.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python \
    python2 \
    make \
    yarn \
    g++ \
    && yarn install \
    && yarn global add react-scripts \
    && yarn add react-scripts typescript \
    && apk del build-dependencies

ENV PATH /app/node_modules/.bin:$PATH
# COPY client/package-lock.json ./
# RUN npm install
# RUN yarn global add react-scripts typescript
# RUN yarn add typescript
COPY client/ ./
RUN yarn build

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
