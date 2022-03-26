package function

import (
	"context"
	"fmt"
	"todo/pb"
	"todo/server/db"
)

type Server struct {}


func (s *Server) AddUser(ctx context.Context, req *pb.AddUserRequest ) (*pb.AddUserResponse, error) {
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

func (s *Server) LoginUser(ctx context.Context, req *pb.LoginUserRequest) (*pb.LoginUserResponse, error) {
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

func (s *Server) GetUserById(ctx context.Context, req *pb.GetUserByIdRequest) (*pb.GetUserByIdResponse, error) {
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
