export const getAllBlogs = `query MyQuery {
  blogs {
    content
    id
    images {
      fileName
      url
    }
    releaseDate
    publishedAt
    slug
    title
  }
}`;
