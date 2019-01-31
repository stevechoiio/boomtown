const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.

  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, name, bio } = user; // Omit the password from the token
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for generating the JWT token.
   *  Here, we'll be taking a JSON object representing the user (the 'J' in JWT)
   *  and cryptographically 'signing' it using our app's 'secret'.
   *  The result is a cryptographic hash representing out JSON user
   *  which can be decoded using the app secret to retrieve the stateless session.
   */
  // Refactor this return statement to return the cryptographic hash (the Token)
  const newUser = { id, email, name };

  const token = jwt.sign(newUser, secret, { expiresIn: '2h' });
  return token;
  // -------------------------------
}

module.exports = app => {
  return {
    async signup(parent, { user }, context) {
      try {
        const { password, name, email } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await context.pgResource.createUser({
          name,
          email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(newUser, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return newUser.id;
      } catch (e) {
        console.log(e);
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        //the user information from database
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        const passwordMatch = await bcrypt.compare(
          args.user.password,
          user.password
        );

        if (passwordMatch) {
          setCookie({
            tokenName: app.get('JWT_COOKIE_NAME'),
            token: generateToken(user, app.get('JWT_SECRET')),
            res: context.req.res
          });
        } else {
        }
        const valid = false;
        // if (!valid || !user) throw 'User was not found.';

        return user.id;
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
