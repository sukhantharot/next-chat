'use client';
import { auth } from "@/libs/firebase.ts";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleClick = () => {
    if (auth.currentUser) {
      router.push(`/${auth.currentUser.uid}`)
    }
  };
  return (
      <main className="flex flex-col items-center justify-between p-24">
        <Box>
          <Button variant={`contained`} onClick={handleClick}> Chat </Button>
        </Box>
      </main>
  )
}
