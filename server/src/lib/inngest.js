import { Inngest } from "inngest";
import connectDB from "../config/bd.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "code-bridge",
});

const addUser = inngest.createFunction(
  {
    id: "add-user",
    triggers: {
      event: "clerk/user.created",
    },
  },
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);
  },
);

const deleteUser = inngest.createFunction(
  {
    id: "delete-user",
    triggers: {
      event: "clerk/user.deleted",
    },
  },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({
      clerkId: id,
    });
  },
);

export const functions = [
  addUser,
  deleteUser
];
