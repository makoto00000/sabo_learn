FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y default-mysql-client
RUN mkdir /api

WORKDIR /api

COPY Gemfile /api/Gemfile

COPY Gemfile.lock /api/Gemfile.lock

ENV BUNDLER_VERSION 2.4.20
RUN gem install bundler -v ${BUNDLER_VERSION} \
    && bundle install

COPY . /api

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["rails", "server", "-b", "0.0.0.0"]