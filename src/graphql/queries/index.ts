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

export function getAllProfilesQuery() {
  return gql`
    query getAllProfiles($id: ID!) {
      profilesCollection(filter: { id: { neq: $id } }) {
        edges {
          node {
            id
            updated_at
            username
            follower_count
            following
          }
        }
      }
    }
  `;
}

export function getAllPostsQuery() {
  return gql`
    query getAllPosts {
      postsCollection(orderBy: [{ created_at: AscNullsFirst }]) {
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

export function getTagsByUserIDQuery() {
  return gql`
    query getTagsByUserID($username: ID!) {
      tagsCollection(filter: { tagged_user: { eq: $username } }) {
        edges {
          node {
            posts {
              id
              created_at
              title
              media_path
              author
              user_id
            }
            profiles {
              username
            }
            id
            post_id
            tagged_by
            tagged_user
          }
        }
      }
    }
  `;
}

export function getUserByUserIDQuery() {
  return gql`
    query getUserByUserID($id: String) {
      profilesCollection(filter: { id: { eq: $id } }) {
        edges {
          node {
            username
          }
        }
      }
    }
  `;
}
