const Song = ({ song, setIsPlaying, setCurrentSong }) => {
    function play(){
        setCurrentSong(song)
        setIsPlaying(true)
    }

    return (
        <li>
            <div className='flex gap-2 cursor-pointer hover:bg-slate-400 hover:text-slate-100 ml-2 rounded-s-sm active:bg-slate-400 active:text-slate-100'>
                <img  className=' rounded-sm w-10' src="./src/assets/logo.jpg" alt=""/>
                <div className="flex items-center" onClick={play}>
                    <p>{song.title} - {song.artist}</p>
                </div>
            </div>
        </li>
    )
}

export default function SongList({ songs, setIsPlaying, setCurrentSong}) {
    const songLength = songs.length
    return (
        <div className="h-[330px] overflow-y-scroll">
            <ul className="flex flex-col gap-0.5">
                {songLength ? 
                    songs.map(song => <Song key={song.id} song={song} setIsPlaying={setIsPlaying} setCurrentSong={setCurrentSong}/>) 
                    :"You have 0 audio files in your device."
                }
            </ul>
        </div>
    )
}