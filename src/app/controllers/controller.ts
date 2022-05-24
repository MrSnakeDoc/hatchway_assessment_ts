import { Direction, SortBy } from "./../../utils/types";
import { Request, Response } from "express";
import { Post } from "../../utils/types";
const { sorting } = require("../services/sorting");
const { cache } = require("../services/cache");

export const controller = {
  /**
   *
   * @param {*} _
   * @param {*} res
   * @returns object { success: true }
   */
  ping(_: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  },

  /**
   *
   * @param {*} req
   * @param {*} res
   * @returns Sorted array of posts objects by given field and ascending or descending order
   */
  async posts(req: Request, res: Response) {
    try {
      // extract the query params
      const tags: string = req.query.tags as string;
      const sortBy: SortBy = req.query.sortBy as SortBy;
      const direction: Direction = req.query.direction as Direction;

      // split the tags into an array
      const allTags: string[] = tags.split(",");

      // get the data from cache or API
      const posts: Post[] = await cache.get(tags, allTags);

      // sort the data by the given field and direction
      sorting(posts, sortBy, direction);

      // return the sorted data
      res.status(200).json({ posts: posts });
    } catch (error) {
      console.log(error);
    }
  },
};
