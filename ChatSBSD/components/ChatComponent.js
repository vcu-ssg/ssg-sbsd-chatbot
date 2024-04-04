import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { env } from 'react-native-dotenv';


const ChatComponent = ( initialMessage = null ) => {
  const [messages, setMessages] = useState([
    {role:'system',content:"You are a helpful assistant that talks like a pirate."},
    {role:'system',content:"Your core knowledge revolves around the Virginia Department of Small Business and Supplier Diversity."},
    {role:'system',content:"You are answering questions from small business owners looking to take businesses to the next level by leveraging SBSD programs."}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [lastFive,setLastFive] = useState('VjQEv');
  const flatListRef = useRef(null);
  const [flatListHeight, setFlatListHeight] = useState(0); // State to track FlatList height

  const sendMessageToChatGPT = async (userInput) => {
    const modelEndpoint = 'https://api.openai.com/v1/chat/completions'; // Endpoint for ChatGPT
    const YOUR_MAMMA = "sk-MF37CL0Wo1VuIhAkyi61T3BlbkFJJ6A0zjqUwdMRx6S" // public GH pages key (restricted)
    const apiInput = [...messages, {role:'user',content: userInput }];

    console.log("API input:\n",apiInput);
    try {
      const response = await fetch(modelEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${YOUR_MAMMA}${lastFive}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // Specify the model you want to use
          messages: apiInput
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
            { role: 'assistant', content: response.choices[0].message.content.trim() }, // Ensure response is trimmed
          ]);
        } else {
          console.error('Empty response received from ChatGPT API');
          setMessages([
            ...messages,
            { role: 'user', content: newMessage.trim() },
            { role: 'error', content: 'Sorry, an error occurred while processing your request.' },
          ]);
        }
      } catch (error) {
        console.error('Error in try:', error);
        setMessages([
          ...messages,
          { role: 'user', content: newMessage.trim() },
          { role: 'error', content: 'Sorry, an error occurred while processing your request.' },
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

  // Adjust FlatList height based on its content, up to a max height
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const maxSize = 400;
    setFlatListHeight(contentHeight+30 > maxSize ? maxSize: contentHeight+30); // Max height: 300
    console.log( 'Width/Height ',contentWidth,'  ',contentHeight);
  };
  
  const filteredMessages = messages.filter(message => message.role !== 'system');

  return (
    <View style={styles.container}>
      <View style={[styles.listContainer, { height: flatListHeight }]}>
        <FlatList
          ref={flatListRef}
          data={filteredMessages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
        />
      </View>
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
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    marginHorizontal: 'auto'
  },
  messageList: {
    flexGrow: 1,
    padding: 10,
  },
  listContainer: {
    maxWidth: '100%',
    flexGrow: 1, // Prevent FlatList from filling the entire container by default
  },
  messageContainer: {
    marginVertical: 5,
    Width: '80%',
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
    paddingHorizontal: 10
  },
});

export default ChatComponent;
