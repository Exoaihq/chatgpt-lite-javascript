const { ReactNode, RefObject } = require('react');

const ChatRole = {
  Assistant: 'assistant',
  User: 'user',
  System: 'system'
};

const ChatGPTVersion = {
  GPT_35_turbo: 'gpt-35-turbo',
  GPT_4: 'gpt-4',
  GPT_4_32K: 'gpt-4-32k'
};

class Prompt {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

class ChatGPTProps {
  constructor(header, fetchPath, config, prompts, onMessages, onSettings, onChangeVersion) {
    this.header = header;
    this.fetchPath = fetchPath;
    this.config = config;
    this.prompts = prompts;
    this.onMessages = onMessages;
    this.onSettings = onSettings;
    this.onChangeVersion = onChangeVersion;
  }
}

class ChatMessage {
  constructor(content, role) {
    this.content = content;
    this.role = role;
  }
}

class ChatMessageItemProps {
  constructor(message) {
    this.message = message;
  }
}

class SendBarProps {
  constructor(loading, disabled, inputRef, onSettings, onSend, onClear, onStop) {
    this.loading = loading;
    this.disabled = disabled;
    this.inputRef = inputRef;
    this.onSettings = onSettings;
    this.onSend = onSend;
    this.onClear = onClear;
    this.onStop = onStop;
  }
}

class ShowProps {
  constructor(loading, fallback, children) {
    this.loading = loading;
    this.fallback = fallback;
    this.children = children;
  }
}

class ChatGPInstance {
  constructor(setPrompt, setChatContent, setMessages, getMessages, scrollDown) {
    this.setPrompt = setPrompt;
    this.setChatContent = setChatContent;
    this.setMessages = setMessages;
    this.getMessages = getMessages;
    this.scrollDown = scrollDown;
  }
}

class ChatConfig {
  constructor(model, stream) {
    this.model = model;
    this.stream = stream;
  }
}

module.exports = {
  ChatRole,
  ChatGPTVersion,
  Prompt,
  ChatGPTProps,
  ChatMessage,
  ChatMessageItemProps,
  SendBarProps,
  ShowProps,
  ChatGPInstance,
  ChatConfig
};