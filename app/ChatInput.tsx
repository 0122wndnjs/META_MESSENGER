"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import fetcher from "../utils/fetchMessages";

function ChatInput() {
  const [input, setInput] = useState("");
  const { data, error, mutate } = useSWR("/api/getMessages", fetcher);

  console.log(data)

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const messageToSend = input;

    setInput("");

    const id = uuid();

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: "Joowon Kim",
      // profilePic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10165787690655179&height=50&width=50&ext=1670750603&hash=AeQwQHgpc7_UkhQLsdY'
      profilePic:
        "https://scontent-ssn1-1.xx.fbcdn.net/v/t1.18169-1/18622551_1313208912128810_5544782204338825168_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=_fvNfXMcvWwAX9XbTCo&_nc_ht=scontent-ssn1-1.xx&oh=00_AfDFYMyk34sVa_DkrZ02nrrKnzh4SDCKASoDEBFjfDne4Q&oe=63BA0D41",
      email: "0122wndnjs@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      // const data = await res.json();
      const messages = []
      // console.log("MESSAGE ADDED >>>", data);
    };

    await mutate(uploadMessageToUpstash)
  };

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white  font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
