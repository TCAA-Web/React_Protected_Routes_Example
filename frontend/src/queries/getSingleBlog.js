export const getSingleBlog = `query singleBlogQuery ($blogslug: String!) {
  blog(where: {slug: $blogslug}) {
    content
    id
    title
    slug
    releaseDate
    images {
      url
      fileName
    }
  }
}`;
