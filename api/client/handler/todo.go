package handler

import (
	"context"
	"fmt"
	"net/http"
	"strconv"
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

	receiveTodo, err := c.CreateTodo(context.Background(), &pb.CreateTodoRequest{User: pUser, Todo: pTodo})
	if err != nil {
    fmt.Printf("CreateTodoハンドラでエラーがありました: %v\n", err)
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }

	//React側ではkeyの頭文字を小文字で扱うので小文字に変換
	returnTodo := map[string]string{"id": strconv.Itoa(int(receiveTodo.Todo.Id)),"title": todo.Title, "content": todo.Content}
	ctx.JSON(http.StatusOK, gin.H{
    "msg":  "Post created successfully.",
    "data": returnTodo,
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

	todos, err := c.GetTodos(context.Background(), &pb.GetTodosRequest{UserId: user.Id})
	if err != nil {
		fmt.Printf("GetTodosハンドラでエラーがありました: %v\n", err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":  "Get todos successfully.",
		"data": todos,
	})
}

func UpdateTodo(ctx *gin.Context) {
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

	pTodo := &pb.Todo{
		Id: todo.Id,
		Title: todo.Title,
		Content: todo.Content,
	}

	user, err := jwt.CurrentUser(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	receiveTodo, err := c.UpdateTodo(context.Background(), &pb.UpdateTodoRequest{Todo: pTodo, UserId: user.Id})
	if err != nil {
		fmt.Printf("UpdateTodoハンドラでエラーがありました: %v\n", err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	returnTodo := map[string]string{"id": strconv.Itoa(int(receiveTodo.Todo.Id)), "title": receiveTodo.Todo.Title, "content": receiveTodo.Todo.Content}
	ctx.JSON(http.StatusOK, gin.H{
		"msg":  "Update todo successfully.",
		"data": returnTodo,
	})
}

func DeleteTodo(ctx *gin.Context) {
	opts := grpc.WithInsecure()
	cc, err := grpc.Dial("server:50051", opts)
	CheckErr("could not connect: %v\n", err)
	defer cc.Close()
	c := pb.NewTodoServiceClient(cc)

	paramID := ctx.Param("id")
  id, err := strconv.Atoi(paramID)
  if err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Not valid ID."})
    return
  }


	_, err = c.DeleteTodo(context.Background(), &pb.DeleteTodoRequest{TodoId: int64(id)})
	if err != nil {
		fmt.Printf("DeleteTodoハンドラでエラーがありました: %v\n", err)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":  "Delete todo successfully.",
	})
}
