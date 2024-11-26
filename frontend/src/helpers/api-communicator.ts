import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    const jwt = res.data;
    localStorage.setItem("token", jwt);
    if(res.status !== 200 ){
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}



export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if(res.status !== 200 ){
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

// now send api request to the backend with a new message
  // and with the help of that then we will receiving response 
  // and we can send new response -> inside setChatMessage Array[]
  // define fn in api-communicator file

// export const sendChatRequest = async (message: string) => {
//     const res = await axios.post("/chat/new", { message });
//     if(res.status !== 200 ){
//         throw new Error("Unable to send chat");
//     }
//     const data = await res.data;
//     return data;
// };

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message }); 
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
  };


export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats"); 
    if (res.status !== 200) {
      throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};


export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete"); 
  if (res.status !== 200) {
    throw new Error("Unable to delete chat");
  }
  const data = await res.data;
  return data;
};


export const logoutUser = async () => {
  const res = await axios.get("/user/logout"); 
  if (res.status !== 200) {
    throw new Error("Unable to Logout ");
  }
  const data = await res.data;
  return data;
};


// Signup
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/user/signup", {name, email, password});
  const jwt = res.data;
  localStorage.setItem("token", jwt);
  if(res.status !== 201 ){
      throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
}