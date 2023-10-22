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
