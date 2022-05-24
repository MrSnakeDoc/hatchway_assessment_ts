import { NextFunction, Request, Response } from "express";

export const checks = (req: Request, res: Response, next: NextFunction) => {
  const keys = ["id", "likes", "popularity", "reads"];

  const directionArray = ["asc", "desc"];

  const tags: string = req.query.tags as string;
  const direction: string = req.query.direction as string;
  const sortBy: string = req.query.sortBy as string;

  // check if the query params are valid
  if (!tags || tags.length === 0) {
    res.status(400).json({ error: "Tag parameter is required" });
  } else if (
    (direction && !directionArray.includes(direction)) ||
    (sortBy && !keys.includes(sortBy))
  ) {
    res.status(400).json({
      error: "direction parameter or sortBy parameter is invalid",
    });
  } else {
    next();
  }
};
