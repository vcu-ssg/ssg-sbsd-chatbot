import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { env } from 'react-native-dotenv';


const ChatComponent = ( initialMessage = null ) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const sendMessageToChatGPT = async (userInput) => {
    const modelEndpoint = 'https://api.openai.com/v1/chat/completions'; // Endpoint for ChatGPT
    const OPENAI_API_KEY = "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" // public GH pages key (restricted)

    try {
      const response = await fetch(modelEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Specify the model you want to use
          messages: [
            { role: 'user', content: userInput }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
      throw error; // Rethrow or handle error as needed
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { role: 'user', content: newMessage.trim() }]);
      setNewMessage('');
  

      console.log("messages: ", messages );

      try {
        const response = await sendMessageToChatGPT(newMessage.trim());
        if (response) { // Check if response is defined
          setMessages([
            ...messages,
            { role: 'user', content: newMessage.trim() },
            { role: 'other', content: response.choices[0].message.content.trim() }, // Ensure response is trimmed
          ]);
        } else {
          console.error('Empty response received from ChatGPT API');
          setMessages([
            ...messages,
            { role: 'user', content: newMessage.trim() },
            { role: 'other', content: 'Sorry, an error occurred while processing your request.' },
          ]);
        }
      } catch (error) {
        console.error('Error in try:', error);
        setMessages([
          ...messages,
          { role: 'user', content: newMessage.trim() },
          { role: 'other', content: 'Sorry, an error occurred while processing your request.' },
        ]);
      }
    }
  };
  
  useEffect(() => {
    // Scroll to the bottom of the FlatList whenever new messages are added
    flatListRef.current.scrollToEnd({ animated: true });
  }, [messages]);

  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
          placeholder="Type your message..."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: 600,
    marginHorizontal: 'auto'
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E2E2E2',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});

export default ChatComponent;
