import jwt from 'jsonwebtoken';

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Aquí puedes acceder a req.user.userId, por ejemplo
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
