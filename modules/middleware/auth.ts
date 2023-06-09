const jwt = require("jsonwebtoken");

export default async function auth(req: any, res: any, next: any) {
  const authString = req.header("Authorization");
  if (!authString) {
    return res.sendStatus(403);
  }

  const token = authString.split(" ").pop();

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (!decoded) {
    return res.sendStatus(403);
  }

  const { id, role } = decoded;
  req.userId = id;
  req.userRole = role;
  next();
}
