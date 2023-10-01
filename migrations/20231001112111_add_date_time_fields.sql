-- Add column "recordDate" to table: "checkins"
ALTER TABLE `checkins` ADD COLUMN `recordDate` date NOT NULL;
-- Add column "startTime" to table: "checkins"
ALTER TABLE `checkins` ADD COLUMN `startTime` datetime NOT NULL;
-- Add column "duration" to table: "checkins"
ALTER TABLE `checkins` ADD COLUMN `duration` numeric NOT NULL;
