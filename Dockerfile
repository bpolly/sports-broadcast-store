# build React app
FROM node:15.8.0 as build
WORKDIR /app
COPY client/package.json ./
ENV PATH /app/node_modules/.bin:$PATH

# COPY client/package-lock.json ./
RUN yarn install --frozen-lockfile
COPY client/ ./
RUN yarn build

# production environment
FROM ruby:2.7.2
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client less
WORKDIR /app

ENV RAILS_ENV production

# install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test

# remove any old JS assets and copy new ones over
RUN rm -f public/index.html
RUN rm -rf public/static
COPY --from=build /app/build /app/public

# copy in rest of source code
COPY . /app/

# EXPOSE 3000

# CMD ["bundle", "exec", "rails", "server", "--port", "3000", "--binding", "0.0.0.0"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
