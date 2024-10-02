export const publishBlog = `mutation publishBlog ($slug: String!) {
  publishBlog(where: {slug: $slug}) {
    id
  }
}`;
