#!/bin/sh
sudo docker build -t patichandana/count-visitors:amd64  --platform linux/amd64 .
sudo docker build -t patichandana/count-visitors:arm64  --platform linux/arm64 .

docker push patichandana/count-visitors:arm64
docker push patichandana/count-visitors:amd64