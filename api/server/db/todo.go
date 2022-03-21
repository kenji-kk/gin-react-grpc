package db

import "fmt"

type Todo struct {
	Id int64
	Title string
	Content string
	UserId int64
}

func (t *Todo) CreateTodo() error {
	cmd := `insert into todos (title, content, user_id) values (?, ?, ?)`
	_, err := Db.Exec(cmd, t.Title, t.Content, t.UserId)
	if err != nil {
		fmt.Printf("Todo追加時にエラーが起きました: %v\n", err)
		return err
	}
	return nil
}
