import express from 'express';
import jwt from 'jsonwebtoken';

const { Request, Response, NextFunction } = express;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  const SECRET = process.env.ACCESS_TOKEN_SECRET || 'hireflow-dev-secret';
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.warn('WARNING: ACCESS_TOKEN_SECRET is not set. Using development fallback secret. Do NOT use in production.');
  }

  jwt.verify(token, SECRET, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};