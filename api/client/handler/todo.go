package handler

import (
	"net/http"
	"todo/client/jwt"
	"todo/client/lib"

	"github.com/gin-gonic/gin"
)

func CreateTodo(ctx *gin.Context){
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

	if err := store.AddPost(user, post); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    return
  }
}
