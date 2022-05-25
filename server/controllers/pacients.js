const Pacient = require("../models/pacient");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.sendApiError({
      title: "Missing Data",
      detail: "Missing email or password",
    });
  }

  Pacient.findOne({ email }, (error, foundPacient) => {
    if (error) {
      return res.mongoError(error);
    }

    if (!foundPacient) {
      return res.sendApiError({
        title: "Mauvais Email",
        detail: "Invalid email ou MDP",
      });
    }

    if (foundPacient.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          sub: foundPacient.id,
          username: foundPacient.username,
        },
        config.JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res.json(token);
    } else {
      return res.sendApiError({
        title: "Invalid MDP",
        detail: "Invalid email or MDP",
      });
    }
  });
};

// REGISTER
exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email || !username) {
    return res.status(422).send({
      errors: [
        {
          title: "Data manquants",
          detail: "Missing username, email ou MDP",
        },
      ],
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid MDP",
          detail: "MPD is not maching MDP de confirmation!",
        },
      ],
    });
  }

  Pacient.findOne({ email }, (error, existingPacient) => {
    if (error) {
      return res.mongoError(error);
    }

    if (existingPacient) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid MDP",
            detail: "A user with provided email exist déjà !",
          },
        ],
      });
    }

    const user = new Pacient({ username, email, password });
    user.save((error) => {
      if (error) {
        return res.mongoError(error);
      }

      return res.json({ status: "registered" });
    });
  });
};

exports.onlyAuthPacient = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decodedToken = parseToken(token);
    if (!decodedToken) {
      return notAuthorized(res);
    }

    Pacient.findById(decodedToken.sub, (error, foundPacient) => {
      if (error) {
        return res.mongoError(error);
      }

      if (foundPacient) {
        // res.locals.user = foundPacient;
        res.locals.pacient = foundPacient;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  try {
    return jwt.verify(token.split(" ")[1], config.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: "Pacient Not Authorized!",
        detail: "You need to log in to get un access!",
      },
    ],
  });
}
