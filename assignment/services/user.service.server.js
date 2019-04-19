
module.exports=function(app) {
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const FacebookStrategy = require('passport-facebook').Strategy;
  const bcrypt = require("bcrypt-nodejs");
  const UserModel = require("../model/user/user.model.server");
  // const facebookConfig = {
  //   clientID     : '357107555011771',
  //   clientSecret : '80430dc4f5bffabbef90854542b6f421',
  //   callbackURL  : 'http://localhost:8080/auth/facebook/callback'
  // };
  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
  };

  //Post calls
  app.post("/api/user", createUsers);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', register);
  app.post ('/api/loggedIn', loggedIn);

  //GET calls
  app.get("/api/user", findUserByCredentials);
  app.get("/api/user/:userId", findUserById);
  app.get('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', {
         successRedirect: '/#/profile', 
        failureRedirect: '/#/login' }));

  //Put calls
  app.put("/api/user/:userId", updateUser);

  //delete calls
  app.delete("/api/user/:userId", deleteUser);


  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);
  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    UserModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function localStrategy(username, password, done) {
    UserModel
      .findUserByUserName(username)
      .then(
        function(user) {
          if(user && bcrypt.compareSync(password, user.password)) {
            console.log("password match");
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    UserModel.findUserByFacebookId(profile.id).then(
      function (user) {
        if (user) {
          return done(null, user);
        } else {
          var names = profile.displayName.split(" ");
          var newFacebookUser = {
            username: '123',
            password: '123',
            lastName: names[1],
            firstName: names[0],
            email: profile.emails ? profile.emails[0].value : "",
            facebook: {
              id: profile.id,
              token: token
            }
          };
          return UserModel.createUser(newFacebookUser);
        }
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    ).then(
      function (user) {
        return done(null, user);
      },
      function (err) {
        if (err) {
          return done(err);
        }
      }
    );
  }

  function login(req, res) {
    var user = req.user;
    console.log("Username: " + user.username);
    console.log("Password: " + user.password);
    res.json(user);
  }

  function logout(req, res) {
    req.logout();
    res.json(200);
    // res.redirect('/login');
  }
 
  function createUsers(req, res) {
    var user = req.body;
    UserModel.createUser(user)
      .then(function(user) {
          res.send(user);
        },
        function(error) {
        console.log("create user error: " + error);
        res.sendStatus(400);
        });
  }

  function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    UserModel
      .createUser(user)
      .then(
        function(user){
          if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
            });
          }
        }
      );
  }


  function loggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  }

  function findUserByUsername(req, res) {
    var username = req.query["username"];
    UserModel.findUserByUserName(username).then(
      function (user) {
        if (user) {
          res.json(user);
        } else {
          res.sendStatus(400).send("Cannot find user with the username");
        }
      },
      function (err) {
        res.sendStatus(400).send(err);
      }
    );
  }

  function findUserByCredentials(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    if (username && password){
      UserModel.findUserByCredentials(username, password).then( function (user) {
          console.log(user);
          if (user) {
            res.status(200).send(user);
          } else {
            res.status(404).send('Not found');
          }
        }
      )
    }
  }

  function findUserById(req, res) {

    var userId = req.params["userId"];
    UserModel.findUserById(userId).then((user) => res.json(user));
  }

  function updateUser(req, res) {

    var userId = req.params['userId'];
    var user = req.body;

    console.log(req.body);
    console.log("update user: " + userId + " " + user.firstName + " " + user.lastName);

    UserModel.updateUser(userId, user).then(function(user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("not found!");
      }
    });
  }

  function deleteUser(req, res) {

    var userId = req.params['userId'];
    UserModel.deleteUser(userId).then(() => (
      res.sendStatus(200)
    ));
  }

};
