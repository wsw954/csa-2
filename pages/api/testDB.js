// pages/api/test.js
// import dbConnect from '../../utils/db';
// import { Buyer } from "/models/user";

// export default async (req, res) => {
//   await dbConnect();



//   res.status(200).json({ message: 'API route test' });
// };

import dbConnect from '../../utils/db';
import { Buyer } from "/models/user";

export default async (req, res) => {
  // Connect to the database
  await dbConnect();

  // Find user by username
  const usernameToFind = "exampleUsername"; // Replace with an actual username from your database
  const user = await Buyer.findOne({ username: "trina1" });

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
    }
};