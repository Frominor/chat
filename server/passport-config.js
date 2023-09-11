import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import User from "./Schema/UserSchema.js";
export function Obertka(passport) {
  passport.use(
    new Strategy(function (username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
}
