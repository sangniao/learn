import { gql } from '@apollo/client';

export const CREATE_POST = gql`
mutation ($input: CreatePostInput!) {
   createPost(input: $input) {
            id
            title
            body
}}`;


export const DELETE_POST = gql`
mutation ( $id: ID! ) {
            deletePost(id: $id)
}`;


export const UPDATE_POST = gql`
   mutation ( $id: ID!, $input: UpdatePostInput!) {
      updatePost(id: $id, input: $input) {
         id
         title
         body
}}`;