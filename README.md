## 概要
docker-composeを使用し、React,Go(Gin),gRPC,Nginx,MySQLの環境を構築し、簡易的なtodo機能を実装中。

## 構築コマンド
1. `git clone git@github.com:kenji-kk/gin-react-grpc-todo`
2. `cd gin-react-grpc-todo`
3. `touch ./front/.env`
4. `echo REACT_APP_HOST="http://localhost" > ./front/.env"` *注意：GCEなどクラウドコンピューティングを使用の場合はlocalhostではなくそちらのipアドレスを指定
5. `docker-compose up`
＊一回で立ち上がらなかったらもう一度３を繰り返す

## 確認URL
- http://localhost (nginx経由)
