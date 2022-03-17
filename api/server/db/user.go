package db

type User struct {
	Id string
	UserName string
	Email string
	Password string
}

func (u *User)AddUser() error{
	cmd := `insert into users (
		username, 
		email, 
		password) values (?, ?, ?)`
	_, err = Db.Exec(cmd, u.UserName, u.Email, u.Password)
	return err
}
