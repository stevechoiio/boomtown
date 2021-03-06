const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload

  scalar Date

  type Item {
    id: ID!
    title: String!
    imageurl: String
    description: String
    itemowner: User!
    tags: [Tag]
    created: Date
    borrower: User
  }

  type User {
    id: ID!
    email: String!
    name: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag {
    id: ID!
    title: String!
  }

  type File {
    id: ID
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]
  }
  input NewUser {
    name: String!
    email: String!
    password: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input NewDateInput {
    date: Date!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem(item: NewItemInput!): Item
    signup(user: NewUser!): ID!
    login(user: LoginInput!): ID!
    logout: Boolean
  }
`;
