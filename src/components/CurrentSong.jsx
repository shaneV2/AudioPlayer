export default function CurrentSong({ song, setMinimized, children}) {
    return (
        <div className="grid grid-flow-col grid-cols-[1fr_.5fr] cursor-pointer items-center justify-between pt-1 px-1 border-t-1 border-slate-400" onClick={() => setMinimized(false)}>
            <div className="flex gap-2">
                <img  className='size-7' src="./src/assets/icons/soundicon.svg" alt=""/>
                <div className='flex items-center w-[300px] overflow-hidden'>
                    <p className="truncate w-full">{song.title} - {song.artist}</p>
                </div>
            </div>
            <div className="flex gap-2 pl-4 justify-end">
                {children}
            </div>
        </div>
    )
}