// Unnused import, but necessary for "declare global {}"
import express from "express";

// Provides new property (user) for Request (req.). Thanks this, we can use user information by token.
declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
