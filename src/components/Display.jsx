import Header from "./Header"
import SongList from "./SongList"
import CurrentSong from "./CurrentSong"
import TogglePlay, {playNextAudio} from "./TogglePlay"
import { useEffect, useState } from "react"

const MinimizedAudioDisplay = ({ songs, currentSong, setCurrentSong, isPlaying, setIsPlaying, setMinimized }) => {
    return (
        <>
            <div>
                <Header>AUDIBA</Header>
            </div>
            <div>
                <SongList songs={songs} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong}/>
            </div>
            <CurrentSong song={currentSong} setMinimized={setMinimized}>
                <TogglePlay currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            </CurrentSong>
        </>
    )
}   

const MaximizedAudioDisplay = ({ currentSong, setCurrentSong, currentTime, setCurrentTime, setMinimized, isPlaying, setIsPlaying, audioDuration}) => {
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    return (
        <>
            <Header>
                <div className="relative h-[36px]">
                    <button className="font-light absolute -top-[5px] cursor-pointer" onClick={() => setMinimized(true)}>{"<"}</button>
                </div>
            </Header>
            <div className="w-full h-[200px]">
                <img className="w-52 h-52 shadow-lg  rounded-sm m-auto bg-red-700 object-contain" src="../src/assets/play.jpg" alt="" />
            </div>
            <div className="">
                <div className="text-center">
                    <p className="font-semibold">{currentSong.title} - {currentSong.artist}</p>
                </div> 
                <div className="">
                    <div className="grid grid-cols-[.1fr_1fr_.1fr] items-center">
                        <p className="w-full text-md text-center">{formatTime(currentTime)}</p>
                        <input className="appearance-none rounded-full w-full h-[1px] bg-slate-400" type="range" name="" id=""/>
                        <p className="w-full text-md text-center">{formatTime(audioDuration)}</p>
                    </div>
                    <TogglePlay currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
                </div>
            </div>
        </>
    )
} 

export default function Display({ minimized, setMinimized, songs, currentSong, setCurrentSong, currentTime, setCurrentTime, isPlaying, setIsPlaying, audioDuration }) {
    if (minimized){
        return ( 
            <div className="grid content-between h-full">
                <MinimizedAudioDisplay 
                    songs={songs} 
                    currentSong={currentSong} 
                    setCurrentSong={setCurrentSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    setMinimized={setMinimized}
                />
            </div>
        )
    }else{
        return (
            <div className="grid content-between h-full">
                <MaximizedAudioDisplay
                    currentSong={currentSong} 
                    setCurrentSong={setCurrentSong}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    setMinimized={setMinimized}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    audioDuration={audioDuration}
                />
            </div>
        )
    }
}