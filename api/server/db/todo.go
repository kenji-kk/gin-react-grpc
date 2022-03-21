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

func GetTodos(userId int64) ([]Todo, error) {
	cmd := `select title, content from todos where user_id = ?`
	rows, err := Db.Query(cmd, userId)
	if err != nil {
		fmt.Printf("GetTodosでエラーが起きました: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	var todos []Todo
	for rows.Next() {
		var todo Todo
		err := rows.Scan(&todo.Title, &todo.Content)
		if err != nil {
			fmt.Printf("スキャン時にエラーが起きました: %v\n", err)
			return nil, err
		}
		todos = append(todos, todo)
	}
	return todos, nil
}
