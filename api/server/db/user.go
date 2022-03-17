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

func (u *User)LoginUser() (User, error){
	cmd := `select id, username, email, password from users
	where email = ?`
	user2 := User{}

	err = Db.QueryRow(cmd, u.Email).Scan(
		&user2.Id,
		&user2.UserName,
		&user2.Email,
		&user2.Password,)
	return user2, err
}
