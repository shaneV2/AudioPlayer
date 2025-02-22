import songs from "../assets/audio.json"

const playNextAudio = (currentSong, setCurrentSong, setIsPlaying) => {
    const currentAudioIndex = songs.findIndex((song) => song.id == currentSong.id)

    if (currentAudioIndex != -1 && currentAudioIndex < songs.length - 1){
        setCurrentSong(songs[currentAudioIndex + 1])
        setIsPlaying(true)
    }else{
        setCurrentSong(songs[0])
        setIsPlaying(true)
    }
}   
const playPrevAudio = (currentSong, setCurrentSong, setIsPlaying) => {
    const currentAudioIndex = songs.findIndex((song) => song.id == currentSong.id)

    if (currentAudioIndex != 0){
        setCurrentSong(songs[currentAudioIndex - 1])
        setIsPlaying(true)
    }else{
        setCurrentSong(songs[songs.length - 1])
        setIsPlaying(true)
    }
}   

export default function TogglePlay({ currentSong, setCurrentSong, isPlaying, setIsPlaying }){
    let mediaButton;
    if (isPlaying){
        mediaButton = <button 
        className="bg-slate-300 border-1 shrink-0 border-slate-400 size-[37px] rounded-full flex justify-center items-center" onClick={(e) => {e.stopPropagation(); setIsPlaying(false)}}>
            <img className="size-5" src="src/assets/icons/pauseicon.svg"/>
        </button>
    }else{
        mediaButton = <button 
        className="bg-slate-300 border-1 shrink-0 border-slate-400 size-[37px] rounded-full flex justify-center items-center" onClick={(e) => {e.stopPropagation(); setIsPlaying(true)}}
        >
            <img className="size-5" src="src/assets/icons/playicon.svg"/>
        </button>
    }
    return (
        <div className="flex gap-2 pt-1 justify-center">
            <button className="bg-slate-300 border-1 shrink-0 border-slate-400 pr-2.5 pl-1.5 py-2 rounded-full flex justify-center items-center" onClick={(e) => {playPrevAudio(currentSong, setCurrentSong, setIsPlaying); e.stopPropagation();}}>
                <img className="size-5 rotate-180" src="src/assets/icons/nexticon.svg" alt="" />
            </button>
            {mediaButton}
            <button className="bg-slate-300 border-1 shrink-0 border-slate-400 pl-2.5 pr-1.5 py-2 rounded-full flex justify-center items-center" onClick={(e) => {playNextAudio(currentSong, setCurrentSong, setIsPlaying); e.stopPropagation();}}>
                <img className="size-5" src="src/assets/icons/nexticon.svg" alt="" />
            </button>
        </div>
    )
}

export {playNextAudio}