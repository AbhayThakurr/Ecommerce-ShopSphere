import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//validate using token

export const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      res.status(401).send({
        success: false,
        message: "Unauthorized aceess",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

// middleware/auth.js

export const verifyToken = (req, res, next) => {
  // const token = req.header("Authorization");
  // if (!token) return res.status(401).json({ message: "Access denied" });

  // try {
  //   const verified = JWT.verify(token, process.env.JWT_SECRET);
  //   req.user = verified;
  //   next();
  // } catch (error) {
  //   res.status(400).json({ message: "Invalid token" });

  // }
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // if there isn't any token

  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // attach the user object to the request
    next();
  });
};
