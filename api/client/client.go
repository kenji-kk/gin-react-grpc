package main

import (
	"time"

	"todo/client/handler"
	"todo/client/jwt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)
	

func main() {
		jwt.JwtSetup()
		
    r := gin.Default()
		r.Use(cors.New(cors.Config{
			// 許可したいHTTPメソッドの一覧
			AllowMethods: []string{
					"POST",
					"GET",
					"OPTIONS",
					"PUT",
					"DELETE",
			},
			// 許可したいHTTPリクエストヘッダの一覧
			AllowHeaders: []string{
					"Access-Control-Allow-Headers",
					"Content-Type",
					"Content-Length",
					"Accept-Encoding",
					"X-CSRF-Token",
					"Authorization",
			},
			// 許可したいアクセス元の一覧
			AllowOrigins: []string{
					"*",
			},
			// 自分で許可するしないの処理を書きたい場合は、以下のように書くこともできる
			// AllowOriginFunc: func(origin string) bool {
			//  return origin == "https://www.example.com:8080"
			// },
			// preflight requestで許可した後の接続可能時間
			// https://godoc.org/github.com/gin-contrib/cors#Config の中のコメントに詳細あり
			MaxAge: 24 * time.Hour,
	}))

    r.GET("/ping", func(c *gin.Context) {
        c.JSON(200, gin.H{
            "message": "pong",
        })
    })
		r.POST("/signup", handler.Signup)
  	r.POST("/signin", handler.Signin)

		authorized := r.Group("/")
		authorized.Use(jwt.Authorization)
		{
			authorized.GET("/todos", handler.GetTodos)
			authorized.POST("/todos",handler.CreateTodo)
			authorized.PUT("/todos/:id",handler.UpdateTodo)
			authorized.DELETE("/todos/:id",handler.DeleteTodo)
		}
    r.Run()
}
