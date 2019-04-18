module.exports= function(app) {
    const userModel = require('../model/user/user.model.server');
    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const FacebookStrategy = require('passport-facebook').Strategy;
    const bcrypt = require('bcrypt-nodejs');
    var facebookConfig =
        { clientID : process.env.FACEBOOK_CLIENT_ID,
            clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL : process.env.FACEBOOK_CALLBACK_URL
        };
    // const appId = 262440037976791;
    // const appSecret = '6ae869ca826f18673b07225df40e0136';
    // var facebookConfig = {
    //   clientID: appId,
    //   clientSecret: appSecret,
    //   callbackURL: '/auth/facebook/callback'
    // };
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/username", findUserByUserName);
    app.get("/api/user", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.post('/api/login',passport.authenticate('local'), login);
    app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/facebook/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/#/profile',
        failureRedirect: '/#/login'
    }));


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use (new LocalStrategy (localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function serializeUser(user, done) { done(null, user); }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id) .then(
            function(user){ done(null, user); },
            function(err){ done(err, null); } );
    }

    function localStrategy(username, password, done){
        userModel.findUserByUserName(username).then(
            function (user){
                if(user && bcrypt.compareSync(password, user['password'])){
                    return done(null,user);
                }else {
                    return done(null, false);
                }
            }
        );
    }

    function facebookStrategy(token, refreshToken, profile, done){
        userModel .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        console.log('user');
                        return done(null, user);
                    } else {
                        console.log('profile');
                        var names = profile.displayName.split(" ");
                        var newFacebookUser = {
                            lastName: names[1],
                            firstName: names[0],
                            email: profile.emails ? profile.emails[0].value:"",
                            facebook: { id: profile.id, token: token } };
                        return userModel.createUser(newFacebookUser);
                    }
                }, function(err) {
                    if (err) {
                        return done(err);
                    } } );
        // .then(
        //   function(user){
        //     return done(null, user);
        //     }, function(err){
        //     if (err) {
        //       return done(err);
        //     }
        //   }
        //   );
    }


    function login(req, res){
        var user = req.user;
        res.json(user);
    }


    function logout(req,res) {
        var user  = req.body;
        req.logOut();

        res.json(user);
    }
    // var users = [
    //   {_id: '123', username: 'alice', password: 'qq', firstname: 'Alice', lastname: 'Alliast', email: 'alice@gmail.com'},
    //   {_id: '234', username: 'bob', password: 'qq'},
    //   {_id: '345', username: 'charlie', password: 'qq'}
    // ];

    function createUser(req, res){
        var newuser = req.body;
        userModel.createUser(newuser).
        then(function(user){
            res.send(user);

        }, function(error){
            console.log("create user error:" + error);
            res.status(400);

        });
    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel.findById(userId).then(function(user){

            res.send(user);
        }, function(error){
            console.log("create user error:" + error);
            res.status(400);

        });
    }

    function findUserByCredentials(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        console.log(username);
        console.log(password);
        userModel.findByCredential(username, password).then(function(user){
            res.send(user);
        }, function(error){
            console.log("create user error:" + error);
            res.status(400);
        });
    }

    function findUserByUserName(req, res) {
        console.log("&&&&&&&&& I am in finduser server service&&&&&&&&&");
        var myusername = req.query["username"];
        userModel.findUserByUserName(myusername).then(function(user){
            res.send(user);
            console.log('I am searching user');
        }, function(error){
            console.log("find user by username error:" + error);
            res.status(400).send(error);
        });
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var user = req.body;
        console.log("update user: " + userId + " " + user.username);
        userModel.updateUser(userId,user).then(
            function(user) {
                res.send(user);
            }, function (error) {
                console.log("update user error:" + error);
                res.status(400).send("update is not successful!");
            }
        );
    }

    function deleteUser(req, res) {
        const userId = req.params['userId'];
        userModel.deleteUser(userId).then(
            function(user) {
                res.send(user);
            }, function (error) {
                console.log("delete user error:" + error);
                res.status(400).send("use not found");
            }
        );
    }
    function register(req, res){
        const user = req.body;
        user['password'] = bcrypt.hashSync(user['password']);
        userModel.createUser(user)
            .then(
                function(user){
                    if (user){
                        req.login(user, function(err){
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }

    function loggedin(req, res){
        res.send(req.isAuthenticated() ? req.user: '0');
    }
}


