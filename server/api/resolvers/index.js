const { ApolloError } = require('apollo-server-express');

const jwt = require('jsonwebtoken');
const authMutations = require('./auth');

const { UploadScalar, DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Upload: UploadScalar,
    Date: DateScalar,

    Query: {
      viewer(root, args, { token }) {
        if (token) {
          console.log(jwt.decode(token, app.get('JWT_SECRET')));
          return jwt.decode(token, app.get('JWT_SECRET'));
        } else {
          return null;
        }
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          return user.rows[0];
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const item = await pgResource.getItems(filter);

          return item;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, { id }, { pgResource }) {
        try {
          const tag = await pgResource.getTags();
          return tag;
        } catch (e) {
          throw new ApolloError(e);
        }
        // -------------------------------
      }
    },

    User: {
      async items(parent, _, { pgResource }) {
        try {
          const userItem = await pgResource.getItemsForUser(parent.id);

          return userItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async borrowed(parent, _, { pgResource }, info) {
        try {
          const borrowedItem = await pgResource.getBorrowedItemsForUser(
            parent.id
          );
          return borrowedItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner(item, _, { pgResource }) {
        try {
          const itemOwner = await pgResource.getUserById(item.ownerid);

          return itemOwner.rows[0];
        } catch (e) {
          throw new ApolloError(`itemowner error : ${e}`);
        }
      },
      async tags(item, _, { pgResource }) {
        try {
          const itemTags = await pgResource.getTagsForItem(item.id);

          return itemTags;
        } catch (e) {
          throw 'unable to get tags from the item';
        }
      },
      async borrower(item, _, { pgResource }) {
        try {
          const borrower = await pgResource.getUserById(item.borrowerid);

          return borrower.rows[0];
        } catch (e) {
          throw 'unable to fetch the borrower from the items';
        }
      },
      async imageurl({ imageurl, imageid, mimetype, data }) {
        if (imageurl) return imageurl;
        if (imageid) {
          return `data:${mimetype};base64, ${data}`;
        }
      }
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, { item }, { pgResource, token }, info) {
        try {
          const user = await jwt.decode(token, app.get('JWT_SECRET'));
          const newItem = await pgResource.saveNewItem({
            item,
            user
          });

          return newItem.rows[0];
        } catch (e) {
          throw 'unable to add new Item';
        }
      }
    }
  };
};
