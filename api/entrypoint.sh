#!/bin/bash

set -e

npx prisma migrate dev --name init_db

exec "$@"