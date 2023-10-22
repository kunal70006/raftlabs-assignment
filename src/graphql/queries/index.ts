import { gql } from "@apollo/client";

export function getPostsByUserIDQuery() {
  return gql`
    query getPostsByUserID($id: ID!) {
      postsCollection(
        filter: { user_id: { eq: $id } }
        orderBy: [{ created_at: AscNullsFirst }]
      ) {
        edges {
          node {
            created_at
            title
            media_path
            author
            user_id
            id
          }
        }
      }
    }
  `;
}

export function getCommentsByPostIDQuery() {
  return gql`
    query getCommentsByPostID($id: BigInt) {
      commentsCollection(filter: { post_id: { eq: $id } }) {
        edges {
          node {
            body
            author
            created_at
            post_id
          }
        }
      }
    }
  `;
}
