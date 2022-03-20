package db

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

var Db *sql.DB
var err error 

func DbConnect() {
	Db, err = sql.Open("mysql", "go_grpc:password@tcp(mysql:3306)/go_database?charset=utf8&parseTime=true&loc=Asia%2FTokyo")
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println("db接続完了")

	cmdU := `CREATE TABLE IF NOT EXISTS users (
		id INT PRIMARY KEY AUTO_INCREMENT,
		username VARCHAR(255),
		email VARCHAR(255),
		hashedpassword LONGBLOB,
		salt LONGBLOB)`

	_, err = Db.Exec(cmdU)
	count := 0
	if err != nil {
		for {
			if err == nil {
				fmt.Println("")
				break
			}
			fmt.Print(".")
			time.Sleep(time.Second)
			count++
			if count > 180 {
				fmt.Println("")
				panic(err)
			}
			_, err = Db.Exec(cmdU)
		}
	}
	fmt.Println("ユーザテーブル作成成功")

	cmdT := `CREATE TABLE IF NOT EXISTS todos (
		id INT PRIMARY KEY AUTO_INCREMENT,
		title TEXT,
		content	TEXT,
		user_id INT,
		CONSTRAINT fk_user_id
    FOREIGN KEY (user_id) 
    REFERENCES users (id)
    ON DELETE CASCADE)`

		_, err = Db.Exec(cmdT)
		count = 0
		if err != nil {
			for {
				if err == nil {
					fmt.Println("")
					break
				}
				fmt.Print(".")
				time.Sleep(time.Second)
				count++
				if count > 180 {
					fmt.Println("")
					panic(err)
				}
				_, err = Db.Exec(cmdT)
			}
		}
		fmt.Println("TODOテーブル作成成功")

	fmt.Println("テーブル作成成功")
}
