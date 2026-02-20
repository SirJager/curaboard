import Image from "next/image";

export default function BackgroundWall() {
	return (
		<Image
			width={500}
			height={500}
			alt="Picture of the author"
			src="/backgrounds/galaxy.jpg"
			className="-z-[20] absolute inset-0"
		/>
	);
}
