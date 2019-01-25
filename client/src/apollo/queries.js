import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    id
    title
    description
    tags {
      title
    }
    itemowner {
      name
      id
    }
  }
`;

export const ITEM_QUERY = gql`
  query item($id: ID) {
    items(id: $id) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
  }
  ${ItemFields}
`;

export const ALL_USER_ITEMS_QUERY = gql`
  query allUser($id: ID!) {
    user(id: $id) {
      items {
        ...ItemFields
      }
      id
      email
      name
      bio
      borrowed {
        ...ItemFields
      }
    }
  }
  ${ItemFields}
`;

export const ALL_TAGS_QUERY = gql`
  query {
    tags {
      title
    }
  }
`;

// export const ADD_ITEM_MUTATION = gql`
//   mutation addItem($item: NewItemInput!, $image: Upload!) {
//     # @TODO: Pass the item and image into the addItem mutation as arguments
//     # and return the new item id when the mutation is complete.
//   }
// `;

// /**
//  * Auth-related queries and mutations.
//  */

// export const VIEWER_QUERY = gql`
//   query {
//     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
//   }
// `;
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `;

// export const SIGNUP_MUTATION = gql`
//   mutation signup($user: SignupInput!) {
//     # @TODO: Pass the user into the signup mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `;

// export const LOGIN_MUTATION = gql`
//   mutation login($user: LoginInput!) {
//     # @TODO: Pass the user into the login mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `;

// import gql from 'graphql-tag';

// /**
//  * Item and user-related queries and mutations.
//  */

// const ItemFields = gql`
//   fragment ItemFields on Item {
//     id
//     title
//     description
//   }
// `;

// export const ITEM_QUERY = gql`
//   query Items($filter:ID){
//     items(filter:$filter) {
//       ...ItemFields
//     }
//   }
//   {$ItemFields}
// `;

// export const ALL_ITEMS_QUERY = gql`
//   query allItems {
//     items {
//       ...ItemFields
//     }
//   }
//   ${ItemFields}
// `;

// export const ALL_USER_ITEMS_QUERY = gql`
//   query user($id: ID!) {
//     user(id:$id){
//     bio
//     email
//     items{
//       ...ItemFields
//     }
//     borrowed

//     # @TODO: Query the bio, email, fullname, items, and borrowed for the user by id
//     # Use the ItemFields fragment for the items and borrowed fields.
//   }
//   ${ItemFields}
// `;

// export const ALL_TAGS_QUERY = gql`
//   query allTags {
//     tags {
//       id
//       title
//     }
//   }
// `;

// // export const ADD_ITEM_MUTATION = gql`
// //   mutation addItem($item: NewItemInput!, $image: Upload!) {
// //     # @TODO: Pass the item and image into the addItem mutation as arguments
// //     # and return the new item id when the mutation is complete.
// //   }
// // `;

// // /**
// //  * Auth-related queries and mutations.
// //  */

// // export const VIEWER_QUERY = gql`
// //   query {
// //     # @TODO: Query the id, email, fullname, and bio fields for the viewer.
// //   }
// // `;
// // export const LOGOUT_MUTATION = gql`
// //   mutation {
// //     # @TODO: Run the logout mutation.
// //   }
// // `;

// // export const SIGNUP_MUTATION = gql`
// //   mutation signup($user: SignupInput!) {
// //     # @TODO: Pass the user into the signup mutation as an argument
// //     # and return the id of the new user when the mutation is complete.
// //   }
// // `;

// // export const LOGIN_MUTATION = gql`
// //   mutation login($user: LoginInput!) {
// //     # @TODO: Pass the user into the login mutation as an argument
// //     # and return the id of the new user when the mutation is complete.
// //   }
// // `;
