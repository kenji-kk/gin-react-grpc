package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"os"
	"os/signal"

	"todo/pb"
	"todo/server/db"

	"google.golang.org/grpc"
)

func checkErr(message string, err error) {
	if err != nil {
		log.Fatalf(message, err)
	}
}

func init() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	db.DbConnect()
}

type server struct {}

func main() {
	fmt.Println("起動")

	lis, err := net.Listen("tcp", "0.0.0.0:50051")
	checkErr("Failed to listen: %v", err)

	s := grpc.NewServer()
	pb.RegisterTodoServiceServer(s, &server{})
	s.Serve(lis)

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)
	<-ch

	fmt.Println("終了中")
	s.Stop()
	lis.Close()
	fmt.Println("終了")
}

func (s *server) AddUser(ctx context.Context, req *pb.AddUserRequest ) (*pb.AddUserResponse, error) {
	user := db.User{
		UserName: req.UserName,
		Email: req.Email,
		Password: req.Password,
	}
	err := user.AddUser()
	return &pb.AddUserResponse{
		Id : "0",
		UserName: user.UserName,
		Email: user.Email,
		Password: user.Password,
	}, err

}

