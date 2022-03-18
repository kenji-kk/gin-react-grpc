package jwt

import (
	"fmt"
	"time"

	"github.com/cristalhq/jwt/v3"
)

type AuthenticatedUser struct {
  Id int64
  UserName string
  Email string
}

var (
  jwtSigner   jwt.Signer
  jwtVerifier jwt.Verifier
)

func JwtSetup() {
  var err error
  key := []byte("jwtSecret123")

  jwtSigner, err = jwt.NewSignerHS(jwt.HS256, key)
  if err != nil {
    fmt.Printf("Error creating JWT signer")
  }

  jwtVerifier, err = jwt.NewVerifierHS(jwt.HS256, key)
  if err != nil {
    fmt.Printf("Error creating JWT verifier")
  }
}

func GenerateJWT(user *AuthenticatedUser) string {
  claims := &jwt.RegisteredClaims{
    ID:        fmt.Sprint(user.Id),
    ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
  }
  builder := jwt.NewBuilder(jwtSigner)
  token, err := builder.Build(claims)
  if err != nil {
    fmt.Printf("Error building JWT")
  }
  return token.String()
}
