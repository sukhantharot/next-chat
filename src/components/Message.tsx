import React from 'react';
import { auth } from '@/libs/firebase.ts';
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountCircle from '@mui/icons-material/AccountCircle';

interface MessageProps {
  message: {
    uid: string;
    avatar: string;
    name: string;
    text: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${message.uid === user?.uid ? 'right' : ''}`}>
      { message.avatar? (
      <img className="chat-bubble__left" src={message.avatar} alt="user avatar" />
        ) : (
        <AccountCircle/>
      )}
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
