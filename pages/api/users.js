import dbConnect from "/utils/db";
import { User } from "/models/user";
import rateLimit from "express-rate-limit";

// Define rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: function (req) {
    // Use the X-Forwarded-For header to get the IP address
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  },
});

export default async function handler(req, res) {
  await dbConnect();
  // Apply rate limiting
  await new Promise((resolve, reject) => {
    limiter(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });

  // Extract query parameters
  const { action, username, email, context} = req.query;

  if (req.method === "GET") {
    switch (action) {
      case "check-username":
        if (!username)
          return res.status(400).json({ error: "Missing username parameter" });
        const userByUsername = await User.findOne({ username });
        if (userByUsername)
          return res.status(409).json({ error: "Username already exists" });
        break;
      case "check-email":
        if (!email) return res.status(400).json({ error: "Missing email parameter" });
        const userByEmail = await User.findOne({ email });
        
        if (context === "login" && !userByEmail) {
          return res.status(409).json({ error: "Email does not exist" });
        } else if (context === "register" && userByEmail) {
          return res.status(409).json({ error: "Email already exists" });
        }
        break;
        case "get-username":
          if (!email) return res.status(400).json({ error: "Missing userID parameter" });
          const user = await User.findOne({ email });
          if (!user) return res.status(404).json({ error: "User not found" });
          return res.status(200).json({ username: user.username });
          break;
      default:
        return res.status(400).json({ error: "Invalid action" });
    }
    // Return success response if username/email is available
    return res.status(200).json({ message: "Available" });
  } else {
    return res.status(405).json({ error: "Method not allowed" }); // Handle methods other than GET
  }
}
