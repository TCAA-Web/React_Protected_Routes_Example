export const deleteBlog = `mutation deleteBlog ($blogID: ID!) {
  deleteBlog(where: {id: $blogID}) {
    id
  }
}`;
