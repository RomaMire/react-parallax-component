import React from "react";
import { useState, useEffect } from "react";

const useDetection = (el, factor) => {
	// el - element taken by a useRef(), factor -  number for pure calculation reasons (for decreasing or increasing the value)
	const [windowDistance, setWindowDistance] = useState(0); // put there the window.scrollY
	const [elHeight, setElHeight] = useState(el?.offsetHeight); // inner height of an element
	const [elOffsetTop, setElOffsetTop] = useState(el?.offsetTop); // ammount of pixels from the top of the element
	const [isOnScreen, setIsOnScreen] = useState(false); // we return this value from this hook and thanks to it, we can conditionaly use this boolean - if "true" (if we see the object on our screen), then we can engage another logic based on "value" and create some dinamic effects

	const [value, setValue] = useState(0); // "value" - depends on the inner height of the element and the window.scrollY

	useEffect(() => {
		let innerHeight = window.innerHeight;

		const handleOffset = () => {
			setElHeight(el?.current.offsetHeight); // height of the element
			setWindowDistance(Math.floor(window.scrollY));
			setElOffsetTop(el?.current.offsetTop); // position of element from the top
		};

		if (
			windowDistance + innerHeight >= elOffsetTop &&
			windowDistance <= elOffsetTop + elHeight // if the element appears in the range of your screen, we set the isOnScreen to "true"
		) {
			setIsOnScreen(true);

			let param = windowDistance + innerHeight - elOffsetTop; // next - create the param based on the abominable calculation :)

			if (factor) {
				// we can put the "factor " value into the hook, and decrease the "value" now , or just calculate it later in Paralax component
				setValue(param * factor);
			} else {
				setValue(param);
			}
		} else {
			setIsOnScreen(false); // if the element is no longer on the screen we swith the "true" to "false" which means we no longer detect the element
		}

		window.addEventListener("scroll", handleOffset);

		return () => {
			window.removeEventListener("scroll", handleOffset);
		};
	}, [windowDistance, elHeight, elOffsetTop, value, el, factor]);

	return {
		isOnScreen,
		value,
	};
};

export default useDetection;
