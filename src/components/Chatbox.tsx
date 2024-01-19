import React, { useEffect, useRef, useState } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  DocumentData,
} from 'firebase/firestore';
import { db } from '@/libs/firebase.ts';
import Message from './Message';
import SendMessageButton from "@/components/SendMessageButton.tsx";

interface MessageItem {
  id: string;
  createdAt: number;
  text: string;
  name: string;
  avatar: string;
  uid: string;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageItem[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...(doc.data() as MessageItem), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessageButton scroll={scroll} />
    </main>
  );
};

export default ChatBox;
