"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language";

const columns = Array.from({ length: 3 }, (_, column) =>
	Array.from({ length: 16 }, (_, row) => column + row * 3 + 1),
);

export default function CoverWall() {
	const { language } = useLanguage();
	const wallRef = useRef<HTMLElement>(null);
	const motion = useRef({ position: 0, speed: 1, impulse: 0 });
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
		if (!wall) return;
		if (reducedMotion) {
			motion.current.speed = 1;
			motion.current.impulse = 0;
			return;
		}
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
			state.impulse *= Math.exp(-dt * 1.4);
			const target = 1 + state.impulse;
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
					7,
					motion.current.impulse + delta / 90,
				);
			}
		};
		let touch: { x: number; y: number; time: number } | null = null;
		const onTouchStart = (event: TouchEvent) => {
			const point = event.touches[0];
			if (point)
				touch = { x: point.clientX, y: point.clientY, time: performance.now() };
		};
		const onTouchMove = (event: TouchEvent) => {
			const point = event.touches[0];
			if (!point || !touch) return;
			const now = performance.now();
			const distance = Math.hypot(
				point.clientX - touch.x,
				point.clientY - touch.y,
			);
			const velocity = (distance / Math.max(now - touch.time, 8)) * 1000;
			motion.current.impulse = Math.max(
				motion.current.impulse,
				Math.min(7, velocity / 220),
			);
			touch = { x: point.clientX, y: point.clientY, time: now };
		};
		const onTouchEnd = () => {
			touch = null;
		};
		const onWheel = (event: WheelEvent) => {
			const scale =
				event.deltaMode === 1
					? 16
					: event.deltaMode === 2
						? wall.clientHeight
						: 1;
			motion.current.impulse = Math.min(
				7,
				motion.current.impulse +
					(Math.hypot(event.deltaX, event.deltaY) * scale) / 90,
			);
		};
		wall.addEventListener("touchstart", onTouchStart, { passive: true });
		wall.addEventListener("touchmove", onTouchMove, { passive: true });
		wall.addEventListener("touchend", onTouchEnd, { passive: true });
		wall.addEventListener("touchcancel", onTouchEnd, { passive: true });
		wall.addEventListener("wheel", onWheel, { passive: true });
		window.addEventListener("scroll", onScroll, { passive: true });
		document.addEventListener("visibilitychange", updatePlayback);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			resize.disconnect();
			wall.removeEventListener("touchstart", onTouchStart);
			wall.removeEventListener("touchmove", onTouchMove);
			wall.removeEventListener("touchend", onTouchEnd);
			wall.removeEventListener("touchcancel", onTouchEnd);
			wall.removeEventListener("wheel", onWheel);
			window.removeEventListener("scroll", onScroll);
			document.removeEventListener("visibilitychange", updatePlayback);
		};
	}, [reducedMotion]);

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
		</section>
	);
}
