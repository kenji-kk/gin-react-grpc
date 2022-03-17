package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
  Username string `binding:"required,min=5,max=30"`
	Email string    `binding:"required,min=5,max=100"`
  Password string `binding:"required,min=7,max=32"`
}

var Users []*User

func Signup(ctx *gin.Context) {
	user := new(User)
  if err := ctx.Bind(user); err != nil {
    ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
    return
  }
  Users = append(Users, user)
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
