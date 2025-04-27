interface Props {
    track: string
}

const SpotifyFrame = ({ track }: Props) => {
    return (
        <iframe src={`https://open.spotify.com/embed/${track}?utm_source=generator&theme=0`} width="100%" height="80" frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    )
}

export default SpotifyFrame