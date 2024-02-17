#!/bin/bash

set -e

rm -f /api/tmp/pids/server.pid

exec "$@"