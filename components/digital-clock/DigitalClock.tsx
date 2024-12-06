// components/DigitalClock.tsx
import { useState, useEffect } from "react";
import dayjs from "dayjs";

type DigitalClockProps = {
	timezone?: string;
};

const DigitalClock = ({ timezone = "local" }: DigitalClockProps) => {
	const [currentTime, setCurrentTime] = useState(dayjs());
	const [isClient, setIsClient] = useState(false);
	const [is24HourFormat, setIs24HourFormat] = useState(false); // Default to 12-hour format

	useEffect(() => {
		setIsClient(true);
		const interval = setInterval(() => {
			setCurrentTime(dayjs());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formattedTime = is24HourFormat
		? currentTime.format("HH:mm:ss")
		: currentTime.format("hh:mm:ss A"); // 12-hour format

	const toggleFormat = () => {
		setIs24HourFormat(!is24HourFormat); // Toggle between formats
	};

	if (!isClient) {
		return null;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<h1
				className="text-lg md:text-3xl font-extrabold text-white text-opacity-70 cursor-pointer  bg-white bg-transparent bg-opacity-10 py-2 px-6 rounded-sm shadow-lg"
				onClick={toggleFormat} // Toggle format on clock click
			>
				{formattedTime}
			</h1>
			{/* 
      <p className="mt-2 text-white opacity-20 ">
        Switch to {is24HourFormat ? '12-hour' : '24-hour'} format
      </p> 
      */}
		</div>
	);
};

export default DigitalClock;
