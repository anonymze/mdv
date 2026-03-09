import ReactPlayer from 'react-player'

export function VideoPlayer({ url }: { url: string }) {
	return (
		<div className="relative aspect-video">
			<ReactPlayer
				src={url}
				width={'100%'}
				height={'100%'}
				controls
				style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
			/>
		</div>
	)
}
