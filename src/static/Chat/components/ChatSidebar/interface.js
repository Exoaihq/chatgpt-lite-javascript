const ChatMessage = require('@/components/ChatGPT/interface').ChatMessage;
const ChatRole = require('@/components/ChatGPT/interface').ChatRole;

function Persona(role, avatar, name, prompt) {
  this.role = role;
  this.avatar = avatar;
  this.name = name;
  this.prompt = prompt;
}

function Chat(id, persona, messages) {
  this.id = id;
  this.persona = persona;
  this.messages = messages;
}

function ChatSidebarProps(isActive, chatList, currentChatId, onChangeChat, onCloseChat, onNewChat, onSettings) {
  this.isActive = isActive;
  this.chatList = chatList;
  this.currentChatId = currentChatId;
  this.onChangeChat = onChangeChat;
  this.onCloseChat = onCloseChat;
  this.onNewChat = onNewChat;
  this.onSettings = onSettings;
}

module.exports = {
  Persona: Persona,
  Chat: Chat,
  ChatSidebarProps: ChatSidebarProps
};