var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');

var userModel = mongoose.model("User",userSchema);


userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUserName = findUserByUserName;
userModel.findByCredential = findByCredential;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;


/*function createUser(user) {
  return userModel.create(user, function (err, userSchema) {
    if(err){return handleError(err);}
  });
}*/
function createUser(user) {
    console.log("model"+user);
    return userModel.create(user);
}

function findUserById(id) {
    return userModel.findById(id);
}

function findUserByUserName(username) {
    return userModel.findOne({username:username});
}

function findByCredential(username,password){
    console.log("I am here");
    return userModel.findOne({username:username,password:password});
}


function updateUser(userId,user) {
    return userModel.findByIdAndUpdate(userId,user);
}

function deleteUser(userId){
    return userModel.findByIdAndRemove(userId);
}
function findUserByFacebookId(facebookId) {
    return userModel.findOne({'facebook.id' : facebookId});
}
