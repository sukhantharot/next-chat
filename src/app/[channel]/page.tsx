'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  DocumentData,
} from 'firebase/firestore';
import {auth, db} from '@/libs/firebase.ts';
import SendMessageButton from "@/components/SendMessageButton.tsx";
import Message from '../../components/Message.tsx'

interface MessageItem {
  id: string;
  createdAt: number;
  text: string;
  name: string;
  avatar: string;
  uid: string;
}

export default function ChannelPage({ params }: { params: { channel: string } }) {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const scroll = useRef<HTMLSpanElement>(null);
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(
      collection(db, params.channel),
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
