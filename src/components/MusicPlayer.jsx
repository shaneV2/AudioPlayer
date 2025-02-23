import { useEffect, useRef, useState } from "react"
import songs from '../assets/audio.json'
import Display from "./Display"
import { playNextAudio } from "./TogglePlay"

export default function MusicPlayer({ audioRef }) {
    const [currentSong, setCurrentSong] = useState(initialAudio)
    const [audioDuration, setAudioDuration] = useState(null)
    const [currentTime, setCurrentTime] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false)
    const [minimizedCurrentSongDisplay, setMinimizedCurrentSongDisplay] = useState(true)
    const audio = audioRef.current
    const intervalId = useRef(null)

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audio.play()
                setIsPlaying(true)
            } catch (error) {
                console.error("Error playing audio: " + error)
            }
        }

        audio.src = currentSong.audio
        audio.load()
        if (isPlaying){
            playAudio()
        }

        return () => {
            setCurrentTime(0)
            audio.pause()
        }
    }, [currentSong])

    useEffect(() => {
        if (!audio) return
        const handleMetadata = () => {
            setAudioDuration(audio.duration)    
        }
        audio.addEventListener("loadedmetadata", handleMetadata)
        return () => audio.removeEventListener("loadedmetadata", handleMetadata)
    }, [currentSong])
    
    useEffect(() => {
        if (isPlaying && audio.paused){
            audio.play()
        }else if (!isPlaying){
            audio.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (!isPlaying) return 
        intervalId.current = setInterval(() => {
            setCurrentTime(previousTime => previousTime + 1)
        }, 1000)
        return () => clearInterval(intervalId.current)
    }, [isPlaying])

    useEffect(() => {
        if (!audio) return;
    
        const handleEnded = () => {
            playNextAudio(currentSong, setCurrentSong, setIsPlaying)
        }

        audio.addEventListener("ended", handleEnded)
        return () => {
            audio.removeEventListener("ended", handleEnded)
        }
    }, [currentSong]);    

    return (
        <div className="pt-2 pb-4 overflow-clip bg-slate-200 rounded-lg min-w-[480px] max-w-[600px] w-[95%] m-auto h-[455px] shadow shadow-slate-500">
            <Display 
                minimized={minimizedCurrentSongDisplay}
                setMinimized={setMinimizedCurrentSongDisplay} 
                songs={songs}
                audio={audio}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTime={currentTime}
                setCurrentTime={setCurrentTime}
                audioDuration={audioDuration}
            />
        </div>
    ) 
}

const initialAudio = songs[0]