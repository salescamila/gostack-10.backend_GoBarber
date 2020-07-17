import { Router } from 'express';

import AuthenticateUserSerivce from '../services/AuthenticateUserService';

/**
 * Regras de negócio:
 * - Verificar se Email existe
 * - Verificar se Usuário é válido
 * - Verificar Hash da senha
 * - Gerar token JWT
 */

 const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserSerivce();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
