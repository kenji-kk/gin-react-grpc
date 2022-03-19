package lib

import (
	"context"
	"todo/client/handler"
	"todo/pb"

	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
)

type User struct {
	Id int64
	UserName string
	Email string
}

func FetchUser(id int64) (*User, error) {
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	handler.CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

  user := new(User)
  user.Id = id
  res, err := c.GetUser(context.Background(), &pb.GetUserRequest{Id: id})
  if err != nil {
    log.Error().Err(err).Msg("Error fetching user")
    return nil, err
  }
  return user, nil
}
