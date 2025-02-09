import { Webhook } from "svix";
import userModel from "../models/user.model.js";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SCERET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SCERET) console.log("Web Hook Secret Not Found");

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SCERET);
  let event;
  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed",
    });
  }

  if (event.type === "user.created") {
    console.log("User created", event);
    const newUser = new userModel({
      clerkId: event.data.id,
      username:
        event.data.username || event.data.email_addresses[0].email_address,
      email: event.data.email_addresses[0].email_address,
      image: event.data.image_url,
    });
    await newUser.save();
  }
  return res.status(200).json({
    message: "Webook reieviced",
  });
};
