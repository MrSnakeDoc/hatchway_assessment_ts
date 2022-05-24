import { Direction, Post, SortBy } from "../../utils/types";

/**sortBy
 *
 * @param {*} posts
 * @param {*} sortBy
 * @param {*} direction
 * @returns sorted array of objects by given field and ascending or descending order
 */
export const sorting = (
  posts: Post[],
  sortBy: SortBy = "id",
  direction: Direction = "asc"
): Post[] => {
  //check if direction is asc or desc
  switch (direction) {
    case "asc":
      // sort the array by the given field in ascending order
      return posts.sort((a: Post, b: Post) => {
        return a[sortBy] - b[sortBy];
      });

    case "desc":
      // sort the array by the given field in descending order
      return posts.sort((a: Post, b: Post) => b[sortBy] - a[sortBy]);
  }
};
