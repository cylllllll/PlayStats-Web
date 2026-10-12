"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import { FiCheck } from "react-icons/fi";

type Option<T extends string> = {
	key: T;
	label: string;
	Icon?: IconType;
	lang?: string;
};

export default function IconSelect<T extends string>({
	label,
	Icon,
	value,
	options,
	onChange,
}: {
	label: string;
	Icon: IconType;
	value: T;
	options: Option<T>[];
	onChange: (value: T) => void;
}) {
	const ref = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const outside = (event: PointerEvent) => {
			if (
				event.target instanceof Node &&
				!ref.current?.contains(event.target)
			) {
				ref.current?.removeAttribute("open");
			}
		};
		const onEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape" && ref.current?.open) {
				ref.current.open = false;
				ref.current.querySelector("summary")?.focus();
			}
		};
		document.addEventListener("pointerdown", outside);
		document.addEventListener("keydown", onEscape);
		return () => {
			document.removeEventListener("pointerdown", outside);
			document.removeEventListener("keydown", onEscape);
		};
	}, []);

	function close() {
		if (ref.current) ref.current.open = false;
		ref.current?.querySelector("summary")?.focus();
	}

	return (
		<details
			ref={ref}
			name="header-settings"
			className="icon-select"
			onKeyDown={(event) => {
				if (event.key !== "Tab") return;
				requestAnimationFrame(() => {
					const details = ref.current;
					if (details && !details.contains(document.activeElement)) {
						details.open = false;
					}
				});
			}}
		>
			<summary className="icon-control" aria-label={label} title={label}>
				<Icon aria-hidden="true" />
			</summary>
			<fieldset className="select-popup">
				<legend className="sr-only">{label}</legend>
				{options.map(({ key, label: optionLabel, Icon: OptionIcon, lang }) => (
					<button
						key={key}
						type="button"
						className="select-option"
						lang={lang}
						aria-pressed={value === key}
						onClick={() => {
							onChange(key);
							close();
						}}
					>
						{OptionIcon && <OptionIcon aria-hidden="true" />}
						<span>{optionLabel}</span>
						<FiCheck className="selection-check" aria-hidden="true" />
					</button>
				))}
			</fieldset>
		</details>
	);
}
