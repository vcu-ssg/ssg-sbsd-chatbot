import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { env } from 'react-native-dotenv';
import Markdown from 'react-native-markdown-display';

const ChatComponent = ( initialMessage = null ) => {
  const [messages, setMessages] = useState([
    {role:'system',content:"You are a helpful assistant, aged between 25 and 35, friendly and to the point."},
    {role:'system',content:"Your core knowledge focuses on the Virginia Department of Small Business and Supplier Diversity."},
    {role:'system',content:"You are answering questions from small business owners looking to take businesses to the next level by leveraging SBSD programs."},
    {role:'system',content:"Your responses can be in markdown for prettier formatting."},
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [lastFive,setLastFive] = useState('VjQEv');
  const flatListRef = useRef(null);
  const inputRef = useRef(null);
  const [flatListHeight, setFlatListHeight] = useState(0); // State to track FlatList height
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(true);


  const instructions = `# Welcome to the VSBSD chatbot!
              
This tool was prototyped by the [Software for Social Good (SSG)](https://internal.ssgvip.com) team at 
[VCU](https://vcu.edu).

* Enter your question in the input line above.
* Your answer will be displayed.  
* Keep the convertation going!
* The chatbot will remember your previous questions and try to keep the conversation going.

## Notes

1. We're using *[ChatGPT 3.5 Turbo](https://platform.openai.com/docs/models)*.
Better models (e.g., [ChatGPT 4.0 turbo](https://platform.openai.com/docs/models), etc.) will contain more recent information and be more response.
1. We're accessing the models through the [openAI API](https://platform.openai.com/docs/introduction).
1. Use of the current model costs less then a penny per interaction. Better models are also more expensive to operate.
1. This site is being hosted for free at [GITHUB pages](https://pages.github.com/).
1. This hosting solution is NOT for production. It is NOT secure or private. We hacked a few things to get this to run publically. One would NOT want to do this for production.
1. Source code is [available here.](https://github.com/vcu-ssg/ssg-sbsd-chatbot/)

## Next actions

1. We recommend exploring [fine tuning](https://platform.openai.com/docs/guides/fine-tuning).  This will
permit the use of custom, fresh data within the conversation.

`;


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
    // Scrolls to the end of the list after the component mounts
    const timer = setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: false });
      inputRef.current.focus();
    }, 50); // A slight delay to ensure the list is fully loaded
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [messages]); // Empty dependency array ensures this runs only once after mount


  const renderItem = ({ item }) => (
    <View style={[styles.messageContainer, item.role === 'user' ? styles.userMessage : styles.otherMessage]}>
      <Markdown style={styles.markdownItem}>{item.content}</Markdown>
    </View>
  );

  // Adjust FlatList height based on its content, up to a max height
  const handleContentSizeChange = (contentWidth, contentHeight) => {
    const maxSize = 400;
    setFlatListHeight(contentHeight+50 > maxSize ? maxSize: contentHeight+50);
    console.log( 'Width/Height ',contentWidth,'  ',contentHeight);
  };
  
  const handleScroll = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    
    // Check if scrolled to the end
    if (y + height >= contentHeight - 40) { // 20 is a small threshold
      setIsScrolledToEnd(true);
    } else {
      setIsScrolledToEnd(false);
    }
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
          onScroll={handleScroll}
          style={styles.messageList}
          ListFooterComponent={<>
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={sendMessage}
              placeholder={
              filteredMessages.length==0 ? "Ask your question about SBSD! ..."
              : "Ask a follow-up or a new question ..."
              }
            />
            { filteredMessages.length==0 &&
            <Markdown style={styles.instructions}>
              {instructions}
            </Markdown>
            }
            </>
          }
        />
        { !isScrolledToEnd && 
        (<TouchableOpacity 
          style={styles.roundButton}
          onPress={() => {
            flatListRef.current.scrollToEnd({ animated: true });
          }}
        >
          <Text style={styles.roundButtonText}>↓</Text>
        </TouchableOpacity>
        )}
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
    borderWidth: 1,
  },
  messageContainer: {
    marginVertical: 5,
    Width: '80%',
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#E2E2E2',
    alignSelf: 'flex-start',
  },
  markdownItem: {
    body: {fontSize: 16 },
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 0,
    fontSize: 16,
    backgroundColor: '#F8D7DC66',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    height:60,
    marginBottom: 15,
  },
  roundButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // Diameter of the round button
    height: 50, // Diameter of the round button
    borderRadius: 50, // Half of the width/height to make it perfectly round
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    bottom: 80, // Positioned 40 pixels above the bottom of the FlatList container
    alignSelf: 'center', // Centered horizontally within its parent
  },
  roundButtonText: {
    fontSize: 30, // Adjust size as needed
    color: 'black',
  },
  instructions: {
    body: {fontSize:15},
  }
});

export default ChatComponent;
