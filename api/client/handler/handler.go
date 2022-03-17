package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"todo/pb"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
)

type User struct {
  UserName string `binding:"required,min=5,max=30"`
	Email string    `binding:"required,min=5,max=100"`
  Password string `binding:"required,min=7,max=32"`
}

var Users []User

func checkErr(message string, err error) {
	if err != nil {
		log.Fatalf(message, err)
	}
}


func Signup(ctx *gin.Context) {
  opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	checkErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

  user := new(User)
  if err := ctx.Bind(user); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }

	res, err := c.AddUser(context.Background(), &pb.AddUserRequest{UserName: user.UserName, Email: user.Email, Password: user.Password})
	checkErr("Fail to create client: %v\n", err)
	fmt.Printf("AllCountry has geted: %v\n", res)

  ctx.JSON(http.StatusOK, gin.H{
    "msg": "Signed up successfully.",
    "jwt": "123456789",
  })
}

func Signin(ctx *gin.Context) {
	user := new(User)
  if err := ctx.Bind(user); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }
  for _, u := range Users {
    if u.Email == user.Email && u.Password == user.Password {
      ctx.JSON(http.StatusOK, gin.H{
        "msg": "Signed in successfully.",
        "jwt": "123456789",
      })
      return
    }
  }
  ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"err": "Sign in failed."})
}
