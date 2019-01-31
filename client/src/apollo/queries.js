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
    created
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
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!) {
    addItem(item: $item) {
      id
    }
  }
`;

// /**
//  * Auth-related queries and mutations.
//  */

export const VIEWER_QUERY = gql`
  query {
    user {
      id
      email
      name
      bio
    }
  }
`;
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignupInput!) {
    signup(user: $user)
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user)
  }
`;
