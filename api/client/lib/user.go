package lib

import (
	"context"
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
	if err != nil {
		log.Error().Msgf("could not connect: %v", err)
		return nil, err
	}
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

  res, err := c.GetUserById(context.Background(), &pb.GetUserByIdRequest{Id: id})
  if err != nil {
    log.Error().Err(err).Msg("Error fetching user")
    return nil, err
  }

	user := &User{
		Id: res.Id,
		UserName: res.UserName,
		Email: res.Email,
	}

  return user, nil
}
