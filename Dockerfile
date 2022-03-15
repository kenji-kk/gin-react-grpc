FROM golang:latest

WORKDIR /app/api

ADD ./api /app/api

RUN go mod tidy
