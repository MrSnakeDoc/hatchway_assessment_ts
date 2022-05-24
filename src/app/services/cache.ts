import { requestCall } from "./requestCall";
const cacheStore: any = {};

/**
 * @param {*} key
 * @param {*} allTags
 * @returns an array of posts objects either from cache or from API
 */
export const cache = {
  get(key: string, allTags: []) {
    try {
      if (cacheStore[key]) {
        // if the cacheStore has the key, return the cached data
        return cacheStore[key];
      } else {
        return this.store(key, allTags);
      }
    } catch (error) {
      console.log(error);
    }
  },
  store(key: string, allTags: []) {
    try {
      // if the cacheStore doesn't have the key, fetch the data from API
      const posts = requestCall(allTags);

      // store the data in the cacheStore
      cacheStore[key] = posts;

      // return the data
      return posts;
    } catch (error) {
      console.log(error);
    }
  },
};
