'use client'
import Image from 'next/image'
import PrimarySearchAppBar from "@/components/layout/top.tsx";
import { auth } from "@/libs/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import React, {createContext, useContext} from "react";
import {ThemeContextProvider} from "@/components/providers/theme.tsx";
import Box from "@mui/material/Box";
import ChatBox from "@/components/Chatbox.tsx";

const ColorModeContext = createContext({});

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <ThemeContextProvider>
      <PrimarySearchAppBar/>
      <main className="flex flex-col items-center justify-between p-24">
        <Box>
          <ChatBox />
        </Box>
      </main>
    </ThemeContextProvider>

  )
}
