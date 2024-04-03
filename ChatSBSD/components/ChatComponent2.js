import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { env } from 'react-native-dotenv';


const ChatComponent2 = ( initialMessage = null ) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef(null);

    // Modified to accept conversation history
    const sendMessageToChatGPT = async (userInput, conversationHistory) => {
        const modelEndpoint = 'https://api.openai.com/v1/chat/completions';
        const OPENAI_API_KEY = "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";

        try {
        const response = await fetch(modelEndpoint, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: conversationHistory.concat([{ role: 'user', content: userInput }]),
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching ChatGPT response:', error);
        throw error;
        }
    };

    const sendMessage = async () => {
        if (newMessage.trim()) {
        const userInput = newMessage.trim();
        setNewMessage('');

        console.log("messages: ", messages);

        try {
            // Pass the current conversation history to sendMessageToChatGPT
            const response = await sendMessageToChatGPT(userInput, messages);
            if (response) {
            setMessages(prevMessages => [
                ...prevMessages,
                { role: 'user', content: userInput },
                { role: 'other', content: response.choices[0].message.content.trim() },
            ]);
            } else {
            console.error('Empty response received from ChatGPT API');
            setMessages(prevMessages => [
                ...prevMessages,
                { role: 'user', content: userInput },
                { role: 'other', content: 'Sorry, an error occurred while processing your request.' },
            ]);
            }
        } catch (error) {
            console.error('Error in try:', error);
            setMessages(prevMessages => [
            ...prevMessages,
            { role: 'user', content: userInput },
            { role: 'other', content: 'Sorry, an error occurred while processing your request.' },
            ]);
        }
        }
    };

    useEffect(() => {
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

export default ChatComponent2;
