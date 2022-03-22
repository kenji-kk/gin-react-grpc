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
	user2, err := user.AddUser()
	if err != nil {
		return nil, err
	}
	return &pb.AddUserResponse{
		Id : user2.Id,
		UserName: user2.UserName,
		Email: user2.Email,
	}, err

}

func (s *server) LoginUser(ctx context.Context, req *pb.LoginUserRequest) (*pb.LoginUserResponse, error) {
	user := db.User{
		Email: req.Email,
		Password: req.Password,
	}
	user2, err := user.LoginUser()
	if err != nil {
		fmt.Printf("LoginUserServerでエラーがありました: %v\n", err)
		return nil, err
	}

	return &pb.LoginUserResponse{
		Id : user2.Id,
		UserName: user2.UserName,
		Email: user2.Email,
	}, err
}

func (s *server) GetUserById(ctx context.Context, req *pb.GetUserByIdRequest) (*pb.GetUserByIdResponse, error) {
	user := db.User{
		Id: req.Id,
	}
	user2, err := user.GetUserById()
	if err != nil {
		return nil, err
	}
	return &pb.GetUserByIdResponse{
		Id : user2.Id,
		UserName: user2.UserName,
		Email: user2.Email,
	}, err
}

func (s *server) CreateTodo(ctx context.Context, req *pb.CreateTodoRequest) (*pb.CreateTodoResponse, error) {
	todo := db.Todo{
		Title: req.Todo.Title,
		Content: req.Todo.Content,
		UserId: req.User.Id,
	}

	id, err := todo.CreateTodo()
	if err != nil {
		return nil, err
	}
	returnTodo := &pb.Todo{
		Id: id,
		Title: todo.Title,
		Content: todo.Content,
	}

	return &pb.CreateTodoResponse{Todo: returnTodo}, nil

}

func (s *server) GetTodos(ctx context.Context, req *pb.GetTodosRequest) (*pb.GetTodosResponse, error) {
	userId := req.UserId
	todos, err := db.GetTodos(userId)
	if err != nil {
		return nil, err
	}

	var pTodos []*pb.Todo
	for _, todo := range todos {
		pTodos = append(pTodos, &pb.Todo{
			Id: todo.Id,
			Title: todo.Title,
			Content: todo.Content,
		})
	}
	return &pb.GetTodosResponse{
		Todos: pTodos,
	}, nil
}

func (s *server) UpdateTodo(ctx context.Context, req *pb.UpdateTodoRequest) (*pb.UpdateTodoResponse, error) {
	todo := db.Todo{
		Id: req.Todo.Id,
		Title: req.Todo.Title,
		Content: req.Todo.Content,
	}
	err := todo.UpdateTodo()
	if err != nil {
		return nil, err
	}
	returnTodo := &pb.Todo{
		Id: todo.Id,
		Title: todo.Title,
		Content: todo.Content,
	}
	return &pb.UpdateTodoResponse{Todo: returnTodo}, nil
}
