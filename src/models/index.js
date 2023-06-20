exports.Message = class Message {
  constructor(role, content) {
    this.role = role;
    this.content = content;
  }
}

exports.ChatConfig = class ChatConfig {
  constructor(model, stream) {
    this.model = model;
    this.stream = stream;
  }
}

exports.ChatGPTVersion = Object.freeze({
  GPT_35_turbo: 'gpt-35-turbo',
  GPT_4: 'gpt-4',
  GPT_4_32K: 'gpt-4-32k'
});

exports.Role = function(role) {
  if (role === 'assistant' || role === 'user') {
    return role;
  } else {
    throw new Error('Invalid role');
  }
}