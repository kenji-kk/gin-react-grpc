package handler

import (
	"context"
	"fmt"
	"net/http"
	"todo/client/jwt"
	"todo/client/lib"
	"todo/pb"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
)

func CreateTodo(ctx *gin.Context){
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

	todo := new(lib.Todo)
	if err := ctx.Bind(todo); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	user, err := jwt.CurrentUser(ctx)
  if err != nil {
    ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
  }

	pUser := &pb.User{
		Id: user.Id,
		UserName: user.UserName,
		Email: user.Email,
	}

	pTodo := &pb.Todo{
		Title: todo.Title,
		Content: todo.Content,
	}

	_, err = c.CreateTodo(context.Background(), &pb.CreateTodoRequest{User: pUser, Todo: pTodo})
	if err != nil {
    fmt.Printf("LoginUserClientでエラーがありました: %v\n", err)
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }

	ctx.JSON(http.StatusOK, gin.H{
    "msg":  "Post created successfully.",
    "data": todo,
  })
}

func GetTodos(ctx *gin.Context) {
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

	user, err := jwt.CurrentUser(ctx)
	if err != nil {
    ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
    return
  }


}
