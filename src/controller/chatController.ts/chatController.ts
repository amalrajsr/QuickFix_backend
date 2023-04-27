import asyncHandler from "express-async-handler";
import chatCollection from "../../model/chatModel";
import { crudHelper } from "../../helper/crudHelper";
import userCollection from "../../model/userModel";
import { chatHelper } from "../../helper/chat/chatHelper";

export const getAllMessages = asyncHandler(async (req, res) => {
  const result = await chatHelper.getConversations({});

  res.json({
    success: true,
    result,
  });
});

export const getMessagesbyID = asyncHandler(async (req, res) => {
  const result = await chatHelper.getConversations({ user: req.params.id });

  res.json({
    success: true,
    result,
  });
});
export const saveMessage = asyncHandler(async (req, res) => {
  // checking user exist or not
  const userExist = await crudHelper.fetchSingleItem(userCollection, {
    _id: req.params.id,
  });
  if (!userExist) throw new Error("invalid user id");

  // checking whether chat document exists or not if not then creates a new document
  const conversationExist = await crudHelper.fetchSingleItem(chatCollection, {
    user: req.params.id,
  });

  if (!conversationExist) {
    const newConversation = await crudHelper.addItem(chatCollection, {
      user: userExist._id,
      conversation: [{ message: req.body.message, sender: req.body.sender }],
    });
    if (!newConversation) throw new Error("adding new chat to database failed");
    res.json({
      success: true,
    });
  } else {
    // updates the the conversation
    const updateConversation = await chatHelper.updateConversation(
      userExist._id,
      { message: req.body.message, sender: req.body.sender }
    );
    if (!updateConversation) throw new Error("update conversation failed");
    res.json({
      updated: true,
    });
  }
});
