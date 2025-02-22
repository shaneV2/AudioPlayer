import { useRef } from "react"
import MusicPlayer from "./components/MusicPlayer"

function App() {
  const audioRef = useRef(new Audio())
  return (
    <MusicPlayer audioRef={audioRef}/>
  )
}

export default App
