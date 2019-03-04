const strs = require('stringstream');

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ name, email, password }) {
      try {
        const newUserInsert = {
          text:
            'INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *;',
          values: [name, email, password]
        };

        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email=($1);',
        values: [email]
      };

      try {
        const user = await postgres.query(findUserQuery);

        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id=$1;',
        values: [id]
      };

      try {
        const user = await postgres.query(findUserQuery);

        if (!user) {
          throw 'there is no user with matching id';
        } else {
          return user;
        }
      } catch (e) {
        throw 'Unable to find user by id';
      }
      // -------------------------------
    },
    async getItems(idToOmit) {
      const query = {
        text: `SELECT * FROM items ${idToOmit ? 'WHERE ownerid != $1' : ''}`,
        values: idToOmit ? [idToOmit] : []
      };
      try {
        const items = await postgres.query(query);

        return items.rows;
      } catch (e) {
        throw 'Unable to retrieve list of all items';
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE ownerid=$1;`,
          values: [id]
        });

        return items.rows;
      } catch (e) {
        throw 'Error getting items for the user id ';
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE borrowerid=$1;`,
          values: [id]
        });
        return items.rows;
      } catch (e) {
        throw 'Error returning borrowed items for user';
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query({ text: `SELECT * FROM tags;` });
        return tags.rows;
      } catch (e) {
        throw 'Error getting all tags';
      }
    },
    async getTagsForItem(id) {
      try {
        const tagsQuery = {
          text: `SELECT * FROM tags WHERE id IN (SELECT tagid FROM itemtag WHERE itemid=$1 )`,
          values: [id] // 0
        };

        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw 'Error getting tags for item';
      }
    },
    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect(async (err, client, done) => {
          try {
            const { title, description, tags } = item;
            const idFromTags = tags.map(tag => Number(tag['id']));

            const newItemQuery = {
              text: `INSERT INTO items(title, description,ownerid)
              VALUES ($1,$2,$3) RETURNING *;`,
              values: [title, description, user.id]
            };

            const newItem = await postgres.query(newItemQuery);
            const tagQuery = tagsQueryString(tags, newItem.rows[0].id, '');

            const newItemTagQuery = {
              text: `INSERT INTO itemtag (tagid,itemid) VALUES ${tagQuery}`,
              values: [...idFromTags]
            };

            const newItemTag = await postgres.query(newItemTagQuery);

            resolve(newItem);
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                reject(err);
              }

              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    },
    async saveNewUser({ fullname, email, password }) {
      return new Promise((resolve, reject) => {
        postgres.connect(async (err, client, done) => {
          try {
            resolve(newItem);
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                reject(err);
              }

              done();
            });
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.';
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
