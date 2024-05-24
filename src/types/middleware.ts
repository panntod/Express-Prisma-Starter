import { Request } from "express";

export interface Token {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}
export interface RequestWithSession extends Request {
  token: Token;
}
