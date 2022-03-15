FROM golang:latest

WORKDIR /app/api

ADD ./api /app/api

RUN go get -u google.golang.org/grpc \
    && go get -u github.com/go-sql-driver/mysql v1.6.0 \
    && go mod tidy
