import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { deleteUserChats, getUserChats, sendChatRequest } from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// static chatMesages
// const chatMessages = [
//   { role: "user", content: "Hello, can you help me with JavaScript?" },
//   { role: "assistant", content: "Of course! What specifically would you like help with in JavaScript?" },
//   { role: "user", content: "I want to learn how to work with arrays." },
//   { role: "assistant", content: "Arrays in JavaScript are used to store multiple values in a single variable. You can create an array like this: `let arr = [1, 2, 3];` Would you like more details on array methods?" },
//   { role: "user", content: "Yes, please! Tell me about the `map()` function." },
//   { role: "assistant", content: "The `map()` function creates a new array by applying a function to each element of the original array. For example: `let newArr = arr.map(x => x * 2);` will multiply each element by 2. Would you like to try it out?" },
//   { role: "user", content: "Great! I'll give it a shot." },
//   { role: "assistant", content: "Let me know if you have any questions while you work on it!" }
// ];

type Message = {
  role: "user" | "assistant";
  content: string;
}


const Chat = () => {

  // navigate
  const navigate = useNavigate();

  // const auth = useAuth();
  // // we can declare a ref inside the input box and from the ref -> we can just get the data of the input
  // // The ref will allow u to get directly to refernce to this input element directly from the DOM
  // const inputRef = useRef<HTMLInputElement | null>(null);

  // // Now we get the input ,so first we would store all the previous chat of the user & then we want to insert the latest chat into the array
  // // Lets declare a chats Array 
  // const [chatMessages, setChatMessages] = useState<Message[]>([]);

  // // lets define fn for button of input / inputButton
  // const handleSumbit = async () => {
  //   // console.log(inputRef.current?.value);
  //   // get the latest input message
  //   const content = inputRef.current?.value as string;
  //   // then remove ref of the input
  //   if (inputRef && inputRef.current) {
  //     inputRef.current.value = ""; // now input should moved on to empty string
  //   }
  //   // create new message 
  //   const newMessage: Message = { role: "user", content };
  //   setChatMessages((prev) => [...prev, newMessage]);

  //   // replacing the full array with the new list of the messages after sending request 
  //   const chatData = await sendChatRequest(content);
  //   setChatMessages([...chatData.chats]);
  // };

  // now send api request to the backend with a new message
  // and with the help of that then we will receiving response 
  // and we can send new response -> inside setChatMessage Array[]
  // define fn in api-communicator file


  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content); 
    setChatMessages([...chatData.chats]);
  }


  // uselayouteffect for renderning all chats when user login again
  useLayoutEffect(() => {
    if(auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", {id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", {id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", {id: "loadchats" });    
        });
    }
  }, [auth]);


  // now delete all chats
  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats" , { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfull", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  }


  useEffect(() => {
    if(!auth?.user) {
      return navigate("/login");
    }
  }, [auth])
  

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box 
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none"
          },
          flex: 0.2,
          flexDirection: "column"
        }}
      >
        <Box 
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
            }}
        >
          <Avatar 
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto" , fontFamily: "work sans"}} >
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: "auto" ,my: 4, p: 3, fontFamily: "work sans"}} >
            You can ask some questions related to Knowledge, Buisness, Advices,
            Education, etc. But avoid sharing personal information.
          </Typography>
          <Button 
            onClick={handleDeleteChats}
            sx={{ 
            width: "200px", 
            my: "auto", 
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400,
            }
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, xs: 1, sm: 1}, flexDirection: "column", px: 3 }} >
        <Typography 
          sx={{ 
            // textAlign: "center", 
            fontSize: "40px", 
            color: "white", 
            mb: 2, 
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        {/* Now we want to render actual chats over there */}
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowy: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {/* here we donot have chat to render so need to create that */}
          {/* use static chat by chatgpt */}
          {chatMessages.map((chat, index) => (
            // @ts-ignore -> to ignore the typechecking on the next time
            <ChatItem content={chat.content} role={chat.role} key={index}/>
          ) )}
        </Box>
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(17,27,39)",
            // padding: "10px",
            borderRadius: 8,
            display: "flex",
            margin: "auto",
          }}
        >
          {" "}
          <input
          ref={inputRef}          
          type="text"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            padding: "30px",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "20px",
          }}
          />
        <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" , mx: 1}}>
          <IoMdSend />
        </IconButton>
        </div>
        
      </Box>

    </Box>
  )
}

export default Chat