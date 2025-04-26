export const queries = {
  getPosts: `query {
    postConnection {
      edges {
        node {
          id
          title
          description
          date
          author
          body
        }
      }
    }
  }`,
  getPost: `query($relativePath: String!) {
    post(relativePath: $relativePath) {
      id
      title
      description
      date
      author
      body
    }
  }`,
}; 