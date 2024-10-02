export const updateBlog = `mutation UpdateBlog ($slug: String!, $content: String!, $title: String!) {
  updateBlog(data: {content: $content, title: $title}, where: {slug: $slug}) {
    id
  }
}`;
