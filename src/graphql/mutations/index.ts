import { gql } from "@apollo/client";
// import { UserProfile } from "../../types";

export function updateProfileMutation() {
  return gql`
    mutation updateProfile($updatedInfo: profilesUpdateInput!, $id: ID!) {
      updateprofilesCollection(set: $updatedInfo, filter: { id: { eq: $id } }) {
        affectedCount
      }
    }
  `;
}

export function createPostMutation() {
  return gql`
    mutation createPost($postData: [postsInsertInput!]!) {
      insertIntopostsCollection(objects: $postData) {
        affectedCount
      }
    }
  `;
}
