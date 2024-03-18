#!/bin/bash

set -e

rm -f /api/tmp/pids/server.pid

# # production環境の場合のみ
if [ "$RAILS_ENV" = "production" ]; then
  sudo service nginx start
  cd /api
  bin/setup
  bundle exec pumactl start
else
  exec "$@"
fi
