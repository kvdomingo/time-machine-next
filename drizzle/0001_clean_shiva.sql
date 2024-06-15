CREATE TABLE `time-machine-next_checkin` (
	`id` text(24) PRIMARY KEY NOT NULL,
	`created` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated` integer,
	`duration` real,
	`start_time` text(5),
	`record_date` text(10),
	`tag` text(255),
	`activities` text(255)
);
