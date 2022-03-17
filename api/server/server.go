package main

import (
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
	pb.RegisterAppServiceServer(s, &server{})
	s.Serve(lis)

	ch := make(chan os.Signal, 1)
	signal.Notify(ch, os.Interrupt)
	<-ch

	fmt.Println("終了中")
	s.Stop()
	lis.Close()
	fmt.Println("終了")
}

