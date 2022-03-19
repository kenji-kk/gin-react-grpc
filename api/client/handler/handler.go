package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"todo/client/jwt"
	"todo/pb"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
)

type AddUser struct {
  UserName string `binding:"required,min=5,max=30"`
	Email string    `binding:"required,min=5,max=100"`
  Password string `binding:"required,min=7,max=32"`
}

type LoginUser struct {
  Email string    `binding:"required,min=5,max=100"`
  Password string `binding:"required,min=7,max=32"`
}



func CheckErr(message string, err error) {
	if err != nil {
		log.Fatalf(message, err)
	}
}


func Signup(ctx *gin.Context) {
  opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

  AddUser := new(AddUser)
  if err := ctx.Bind(AddUser); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }

	res, err := c.AddUser(context.Background(), &pb.AddUserRequest{UserName: AddUser.UserName, Email: AddUser.Email, Password: AddUser.Password})
	CheckErr("Fail to create client: %v\n", err)
	fmt.Printf("User has geted: %v\n", res)

  user := &jwt.AuthenticatedUser{
    Id: res.Id,
    UserName: res.UserName,
    Email: res.Email,
  }

  ctx.JSON(http.StatusOK, gin.H{
    "msg": "Signed up successfully.",
    "jwt": jwt.GenerateJWT(user),
  })
}

func Signin(ctx *gin.Context) {
  opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

	LoginUser := new(LoginUser)
  if err := ctx.Bind(LoginUser); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }
  
  res, err := c.LoginUser(context.Background(), &pb.LoginUserRequest{Email: LoginUser.Email, Password: LoginUser.Password})
  if err != nil {
    fmt.Printf("LoginUserClientでエラーがありました: %v\n", err)
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }

  user := &jwt.AuthenticatedUser{
    Id: res.Id,
    UserName: res.UserName,
    Email: res.Email,
  }

  ctx.JSON(http.StatusOK, gin.H{
    "msg": "Signed in successfully.",
    "jwt": jwt.GenerateJWT(user),
  })
}
