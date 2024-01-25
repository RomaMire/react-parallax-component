import { useRef, useEffect } from "react";
import styles from "./paralax.module.scss";
import useDetection from "../../hooks/use-detection"; // check your folder path

const Parallax = (props) => {
	const imgRef = useRef();

	const { isOnScreen, value } = useDetection(imgRef, 0.05);

	useEffect(() => {
		const handleParalax = () => {
			imgRef.current.style.backgroundPosition = `${value}% ${value}%`;
			//imgRef.current.style.transform += `scale(${1 + value * 0.0001})`;
		};

		if (isOnScreen) {
			window.addEventListener("scroll", handleParalax);
		}

		return () => {
			window.removeEventListener("scroll", handleParalax);
		};
	}, [value, isOnScreen]);

	return (
		<div className={styles.paralax}>
			{props.children}
			<div className={styles.paralax__img} ref={imgRef}></div>
		</div>
	);
};

export default Parallax;
