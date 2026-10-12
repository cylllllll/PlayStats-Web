"use client";

import { useEffect, useRef, useState } from "react";
import { FiFastForward, FiPause, FiPlay } from "react-icons/fi";
import { useLanguage } from "./language";

const columns = Array.from({ length: 3 }, (_, column) =>
	Array.from({ length: 16 }, (_, row) => column + row * 3 + 1),
);

export default function CoverWall() {
	const { language } = useLanguage();
	const wallRef = useRef<HTMLElement>(null);
	const motion = useRef({ position: 0, speed: 1, impulse: 0, held: false });
	const [paused, setPaused] = useState(false);
	const [reducedMotion, setReducedMotion] = useState(false);

	useEffect(() => {
		const preference = matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReducedMotion(preference.matches);
		update();
		preference.addEventListener("change", update);
		return () => preference.removeEventListener("change", update);
	}, []);

	useEffect(() => {
		const wall = wallRef.current;
		if (!wall || paused || reducedMotion) return;
		const tracks = [...wall.querySelectorAll<HTMLElement>(".cover-track")];
		let frame = 0;
		let previous = 0;
		let visible = false;
		let lastScroll = window.scrollY;
		let heights = tracks.map(() => 0);

		const measure = () => {
			heights = tracks.map(
				(track) => (track.firstElementChild as HTMLElement).offsetHeight,
			);
		};
		const resize = new ResizeObserver(measure);
		for (const track of tracks) {
			if (track.firstElementChild) resize.observe(track.firstElementChild);
		}
		measure();

		const tick = (now: number) => {
			const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
			previous = now;
			const state = motion.current;
			state.impulse *= Math.exp(-dt * 1.8);
			const target = state.held ? 6 : 1 + state.impulse;
			state.speed += (target - state.speed) * (1 - Math.exp(-dt * 7));
			state.position += dt * 24 * state.speed;
			tracks.forEach((track, index) => {
				const height = heights[index];
				if (!height) return;
				const distance =
					(state.position * (1 + index * 0.12) + index * 93) % height;
				const y = index === 1 ? distance - height : -distance;
				track.style.transform = `translate3d(0, ${y}px, 0)`;
			});
			frame = requestAnimationFrame(tick);
		};
		const updatePlayback = () => {
			cancelAnimationFrame(frame);
			previous = 0;
			if (visible && !document.hidden) frame = requestAnimationFrame(tick);
		};
		const observer = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting;
				updatePlayback();
			},
			{ threshold: 0 },
		);
		observer.observe(wall);
		const onScroll = () => {
			const delta = Math.abs(window.scrollY - lastScroll);
			lastScroll = window.scrollY;
			if (visible) {
				motion.current.impulse = Math.min(
					5,
					motion.current.impulse + delta / 90,
				);
			}
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("visibilitychange", updatePlayback);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			resize.disconnect();
			motion.current.held = false;
			window.removeEventListener("scroll", onScroll);
			document.removeEventListener("visibilitychange", updatePlayback);
		};
	}, [paused, reducedMotion]);

	return (
		<section
			ref={wallRef}
			className="cover-wall"
			aria-label={language === "cn" ? "游戏封面墙" : "Game cover wall"}
		>
			<div className="cover-stage" aria-hidden="true">
				{columns.map((covers) => (
					<div className="cover-column" key={covers[0]}>
						<div className="cover-track">
							{[0, 1].map((repeat) => (
								<div className="cover-group" key={repeat}>
									{covers.map((cover, index) => (
										<img
											key={cover}
											src={`/assets/login-covers/cover-${String(cover).padStart(2, "0")}.jpg`}
											alt=""
											width={384}
											height={384}
											loading={repeat === 0 && index < 3 ? "eager" : "lazy"}
											decoding="async"
											draggable={false}
										/>
									))}
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			{!reducedMotion && (
				<div className="cover-controls">
					<button
						type="button"
						className="cover-pause"
						aria-label={
							language === "cn"
								? paused
									? "继续滚动"
									: "暂停滚动"
								: paused
									? "Resume scrolling"
									: "Pause scrolling"
						}
						aria-pressed={paused}
						onClick={() => setPaused(!paused)}
					>
						{paused ? (
							<FiPlay aria-hidden="true" />
						) : (
							<FiPause aria-hidden="true" />
						)}
					</button>
					<button
						type="button"
						className="cover-boost"
						disabled={paused}
						onPointerDown={(event) => {
							event.currentTarget.setPointerCapture(event.pointerId);
							motion.current.held = true;
						}}
						onPointerUp={() => {
							motion.current.held = false;
						}}
						onPointerCancel={() => {
							motion.current.held = false;
						}}
						onLostPointerCapture={() => {
							motion.current.held = false;
						}}
						onBlur={() => {
							motion.current.held = false;
						}}
						onClick={() => {
							motion.current.impulse = 5;
						}}
					>
						<FiFastForward aria-hidden="true" />
						<span>{language === "cn" ? "按住加速" : "Hold to speed up"}</span>
					</button>
				</div>
			)}
		</section>
	);
}
