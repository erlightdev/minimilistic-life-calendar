"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Settings as SettingsIcon } from "lucide-react";
import { DateOfBirthCalendar } from "../DateOfBirthCalendar";

export function Settings() {
	const { settings, updateSettings } = useStore();
	const [isOpen, setIsOpen] = useState(false);
	const [localSettings, setLocalSettings] = useState(settings);

	const handleSave = () => {
    console.log("Saving settings:", localSettings); // Debug log
    updateSettings(localSettings);
    setIsOpen(false);
  };

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<SettingsIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-4">
					<div className="space-y-2">
						<DateOfBirthCalendar
							className=""
							selectedDate={localSettings.dateOfBirth}
							onDateChange={(date: any) => {
								console.log("Selected Date:", date); // Debug log
								setLocalSettings({ ...localSettings, dateOfBirth: date });
							}}
						/>
					</div>
					<div className="space-y-2">
						<Label>Pomodoro Length (minutes)</Label>
						<Input
							type="number"
							value={localSettings.pomodoroLength}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									pomodoroLength: Number.parseInt(e.target.value),
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Short Break Length (minutes)</Label>
						<Input
							type="number"
							value={localSettings.shortBreakLength}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									shortBreakLength: Number.parseInt(e.target.value),
								})
							}
						/>
					</div>
					<div className="space-y-2">
						<Label>Long Break Length (minutes)</Label>
						<Input
							type="number"
							value={localSettings.longBreakLength}
							onChange={(e) =>
								setLocalSettings({
									...localSettings,
									longBreakLength: Number.parseInt(e.target.value),
								})
							}
						/>
					</div>
				</div>
				<div className="flex justify-end">
					<Button onClick={handleSave}>Save Changes</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
