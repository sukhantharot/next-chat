import React, { useState, FormEvent, ChangeEvent } from 'react';
import { auth, db } from '@/libs/firebase.ts';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface SendMessageProps {
  scroll: React.RefObject<HTMLDivElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll }) => {
  const [message, setMessage] = useState<string>('');

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (message.trim() === '') {
      alert('Enter a valid message');
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      // Handle the case where the user is not authenticated
      return;
    }

    const { uid, displayName, photoURL } = user;

    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage('');
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;

