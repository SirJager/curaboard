/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from "@/lib/logger";
import {ImageResponse} from "@vercel/og";

export const runtime = "edge";

export const alt = "Blog post preview";
export const size = {width: 1200, height: 630};
export const contentType = "image/png";

const data = {
	title: "Blog Post Preview",
	description: "some descr update_description",
} as const;

export default async function GET(request: Request) {
	try {
		console.log(request.url);

		return new ImageResponse(
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "100%",
					height: "100%",
					padding: 60,
					background: "linear-gradient(135deg, #0a0b10 0%, #0f1015 100%)",
				}}
			>
				<span style={{color: "#71717a", fontSize: 24}}>date here</span>

				<h1
					style={{
						display: "flex",
						color: "white",
						fontSize: 64,
						fontWeight: 600,
						marginTop: 40,
						lineHeight: 1.2,
					}}
				>
					{data.title}
				</h1>

				<p
					style={{
						display: "flex",
						color: "#a1a1aa",
						fontSize: 28,
						marginTop: 24,
					}}
				>
					{data.description}
				</p>

				<span
					style={{
						display: "flex",
						color: "#71717a",
						fontSize: 24,
						marginTop: "auto",
					}}
				>
					yoursite.com
				</span>
			</div>,
			{...size},
		);
	} catch (e: any) {
		logger.log(e);
		return new Response("Failed to generate OG image", {status: 500});
	}
}
