package lib

type Todo struct {
	Id int64
	Title string `binding:"required,min=1,max=50"`
	Content string `binding:"required,min=1,max=50"`
}
