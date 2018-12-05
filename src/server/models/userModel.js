import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: String,
    twitter: String,
    google: String,
    tokens: Array,

    profile: {
      name: String,
      gender: String,
      location: String,
      website: String,
      picture: String
    }
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

const comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};
userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
// userSchema.methods.gravatar = function(size: number) {
//   if (!size) {
//     size = 200;
//   }
//   if (!this.email) {
//     return `https://gravatar.com/avatar/?s=${size}&d=retro`;
//   }
//   const md5 = crypto
//     .createHash("md5")
//     .update(this.email)
//     .digest("hex");
//   return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
// };

const User = mongoose.model("User", userSchema);
export default User;
