const { useEffect, useImperativeHandle, useReducer, useRef, useState } = require('react');
const ClipboardJS = require('clipboard');
const { throttle } = require('lodash-es');

const scrollDown = throttle(
  () => {
    const messageList = document.querySelector('.message-list');
    setTimeout(() => {
      messageList && messageList.scrollTo({ top: messageList.scrollHeight, behavior: 'smooth' });
    }, 0);
  },
  300,
  {
    leading: true,
    trailing: false
  }
);

const requestMessage = async (
  url,
  messages,
  prompts,
  controller,
  config
) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      messages,
      prompts,
      config
    }),
    signal: controller && controller.signal
  });
  if (config.stream === false) {
    return response;
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = response.body;

  if (!data) {
    throw new Error('No data');
  }

  return data.getReader();
}

const useChatGPT = (props, ref) => {
  const inputRef = useRef(null);

  const { prompts = [], config = {}, fetchPath, onMessages, onSettings, onChangeVersion } = props;
  const [, forceUpdate] = useReducer((x) => !x, false);
  const allMessagesRef = useRef([]);
  const [messages, setMessages] = useState([]);
  const [disabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const controller = useRef(null);
  const currentMessage = useRef('');

  const archiveCurrentMessage = (message) => {
    const content = message || currentMessage.current;
    currentMessage.current = '';
    setLoading(false);
    if (content) {
      setMessages((messages) => {
        const newMessages = [
          ...messages,
          {
            content,
            role: 'Assistant'
          }
        ];
        onMessages && onMessages(newMessages);
        return newMessages;
      });
      scrollDown();
    }
  };

  const fetchMessage = async (messages) => {
    try {
      currentMessage.current = '';
      controller.current = new AbortController();
      setLoading(true);

      if (config.stream === false) {
        const data = await requestMessage(
          fetchPath,
          messages,
          prompts,
          controller.current,
          config
        );
        const json = await data.json();
        archiveCurrentMessage(json.message);
      } else {
        const reader = await requestMessage(
          fetchPath,
          messages,
          prompts,
          controller.current,
          config
        );
        const decoder = new TextDecoder('utf-8');
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (value) {
            const char = decoder.decode(value);
            if (char === '\n' && currentMessage.current.endsWith('\n')) {
              continue;
            }
            if (char) {
              currentMessage.current += char;
              forceUpdate();
            }
            scrollDown();
          }
          done = readerDone;
        }
        archiveCurrentMessage();
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
      return;
    }
  };

  const onStop = () => {
    if (controller.current) {
      controller.current.abort();
      archiveCurrentMessage();
    }
  };

  const onSend = (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    fetchMessage(newMessages);
    onMessages && onMessages(newMessages);
    scrollDown();
  };

  const onClear = () => {
    setMessages([]);
    onMessages && onMessages([]);
  };

  useEffect(() => {
    allMessagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    new ClipboardJS('.chat-wrapper .copy-btn');
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        setChatContent: (prompt) => {
          inputRef.current.value = prompt.content;
          inputRef.current.style.height = 'auto';
        },
        setMessages: (messages) => {
          setMessages(messages);
          scrollDown();
        },
        getMessages: () => {
          return allMessagesRef.current;
        }
      };
    },
    []
  );

  return {
    loading,
    disabled,
    messages,
    currentMessage,
    inputRef,
    onChangeVersion,
    onSend,
    onClear,
    onStop,
    onSettings
  };
};

module.exports = {
  useChatGPT
};