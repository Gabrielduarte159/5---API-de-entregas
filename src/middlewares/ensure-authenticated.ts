import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { authConfig } from "@/configs/auth.js"
import { AppError } from "@/utils/AppError.js"

interface TokenPayload {
  role: string
  sub: string
}

function ensureAutenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // O token JWT vem no header Authorization, normalmente neste formato:
    // Authorization: Bearer token_aqui
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new AppError("JWT token not found", 401)
    }

    // Separa "Bearer token_aqui" em ["Bearer", "token_aqui"]
    // e pega apenas o token.
    const [, token] = authHeader.split(" ")

    // Adaptação para projeto ESM:
    // Em vez de `import { verify } from "jsonwebtoken"`,
    // usamos `import jwt from "jsonwebtoken"` e chamamos `jwt.verify(...)`.
    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload

    // Adiciona os dados do usuário autenticado dentro da request.
    // Para o TypeScript aceitar `request.user`, é necessário ampliar
    // o tipo Request do Express no arquivo de declaração.
    request.user = {
      id: user_id,
      role,
    }

    // Libera a requisição para seguir para o próximo middleware/controller.
    return next()
  } catch (error) {
    throw new AppError("Invalid JWT token", 401)
  }
}

export { ensureAutenticated }