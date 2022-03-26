package function

import (
	"context"
	"fmt"

	"todo/pb"
	"todo/server/db"
)


func (s *Server) CreateTodo(ctx context.Context, req *pb.CreateTodoRequest) (*pb.CreateTodoResponse, error) {
	todo := db.Todo{
		Title: req.Todo.Title,
		Content: req.Todo.Content,
		UserId: req.User.Id,
	}

	id, err := todo.CreateTodo()
	if err != nil {
		return nil, err
	}
	returnTodo := &pb.Todo{
		Id: id,
		Title: todo.Title,
		Content: todo.Content,
	}

	return &pb.CreateTodoResponse{Todo: returnTodo}, nil

}

func (s *Server) GetTodos(ctx context.Context, req *pb.GetTodosRequest) (*pb.GetTodosResponse, error) {
	userId := req.UserId
	todos, err := db.GetTodos(userId)
	if err != nil {
		return nil, err
	}

	var pTodos []*pb.Todo
	for _, todo := range todos {
		pTodos = append(pTodos, &pb.Todo{
			Id: todo.Id,
			Title: todo.Title,
			Content: todo.Content,
		})
	}
	return &pb.GetTodosResponse{
		Todos: pTodos,
	}, nil
}

func (s *Server) UpdateTodo(ctx context.Context, req *pb.UpdateTodoRequest) (*pb.UpdateTodoResponse, error) {
	todo := db.Todo{
		Id: req.Todo.Id,
		Title: req.Todo.Title,
		Content: req.Todo.Content,
	}
	comTodo, err:= db.FetchTodo(todo.Id)
	if err != nil {
		return nil, err
	}
	
	if comTodo.UserId != req.UserId {
		return nil, fmt.Errorf("権限がありません")
	}
	err = todo.UpdateTodo()
	if err != nil {
		return nil, err
	}
	returnTodo := &pb.Todo{
		Id: todo.Id,
		Title: todo.Title,
		Content: todo.Content,
	}
	return &pb.UpdateTodoResponse{Todo: returnTodo}, nil
}

func (s *Server) DeleteTodo(ctx context.Context, req *pb.DeleteTodoRequest) (*pb.DeleteTodoResponse, error) {
	todo := db.Todo{
		Id: req.TodoId,
	}
	comTodo, err:= db.FetchTodo(todo.Id)
	if err != nil {
		return nil, err
	}

	fmt.Printf("comTodo.UserId: %v\n", comTodo.UserId)
	fmt.Printf("req.UserId: %v\n", req.UserId)

	if comTodo.UserId != req.UserId {
		return nil, fmt.Errorf("権限がありません")
	}

	err = todo.DeleteTodo()
	if err != nil {
		return nil, err
	}
	return &pb.DeleteTodoResponse{}, nil
}
