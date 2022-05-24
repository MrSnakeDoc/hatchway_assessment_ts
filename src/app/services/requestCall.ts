import axios from "axios";

export const requestCall = async (allTags: string[]) => {
  try {
    // if the cacheStore doesn't have the key, fetch the data from API
    return await Promise.all(
      allTags.map(async (tag) => {
        const { data } = await axios.get(
          `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`
        );

        return data.posts;
      })
    );
  } catch (err) {
    console.log(err);
  }
};
