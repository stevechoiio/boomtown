const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    maxAge: 1000 * 60 * 120,
    httpOnly: true
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, name, bio } = user;

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
