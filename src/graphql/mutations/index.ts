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

export function updateFollowersMutation() {
  return gql`
    mutation updateFollowers($id:UUID!, $following:[UUID]){
      updateprofilesCollection(filter:{id:{eq:$id}}, set:{following:$following}){
        affectedCount
      }
    }
  `;
}

export function updateFollowerCountMutation() {
  return gql`
    mutation updateFollowers($id:UUID!, $follower_count:Int){
      updateprofilesCollection(filter:{id:{eq:$id}}, set:{follower_count:$follower_count}){
        affectedCount
      }
    }
  `;
}

export function createCommentMutation() {
  return gql`
  mutation createComment($authorObj:[commentsInsertInput!]!){
    insertIntocommentsCollection(objects:$authorObj){
      affectedCount
    }
  }
`
}

export function createTagMutation() {
  return gql`
  mutation createTag($tagObj:[tagsInsertInput!]!){
    insertIntotagsCollection(objects:$tagObj){
      affectedCount
    }
  }
  `
}