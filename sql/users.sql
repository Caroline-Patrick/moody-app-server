DROP TABLE IF EXISTS users, userLogs, moods, interventions, mood_interventions, userInterventions, userInterventionMoods;

CREATE TABLE `users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

CREATE TABLE `moods` (
  `moodId` INT NOT NULL AUTO_INCREMENT,
  `moodName` VARCHAR(50) NOT NULL,
  `moodDesc` VARCHAR(300) NULL,
  PRIMARY KEY (`moodId`),
  UNIQUE INDEX `moodId_UNIQUE` (`moodId` ASC) VISIBLE);

  CREATE TABLE `sub_moods` (
  `subMoodId` INT NOT NULL AUTO_INCREMENT,
  `moodId` INT NOT NULL,
  `subMoodName` VARCHAR(50) NOT NULL,
  `subMoodDesc` VARCHAR(300) NULL,
  PRIMARY KEY (`subMoodId`),
  UNIQUE INDEX `subMoodId_UNIQUE` (`subMoodId` ASC) VISIBLE,
  INDEX `fk_subMood_moodId_idx` (`moodId` ASC) VISIBLE,
  CONSTRAINT `fk_subMood_moodId`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `sub_sub_moods` (
  `subSubMoodId` INT NOT NULL AUTO_INCREMENT,
  `subMoodId` INT NOT NULL,
  `subSubMoodName` VARCHAR(50) NOT NULL,
  `subSubMoodDesc` VARCHAR(300) NULL,
  PRIMARY KEY (`subSubMoodId`),
  UNIQUE INDEX `subSubMoodId_UNIQUE` (`subSubMoodId` ASC) VISIBLE,
  INDEX `fk_subSubMood_subMoodId_idx` (`subMoodId` ASC) VISIBLE,
  CONSTRAINT `fk_subSubMood_subMoodId`
    FOREIGN KEY (`subMoodId`)
    REFERENCES `sub_moods` (`subMoodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `interventions` (
  `interventionId` INT NOT NULL AUTO_INCREMENT,
  `interventionName` VARCHAR(45) NOT NULL,
  `interventionDesc` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`interventionId`),
  UNIQUE INDEX `interventionId_UNIQUE` (`interventionId` ASC) VISIBLE);


CREATE TABLE `mood_interventions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `moodId` INT NOT NULL,
  `interventionId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mood_intervention_unique` (`moodId`, `interventionId`) VISIBLE,
  INDEX `fk_moodId_idx` (`moodId` ASC) VISIBLE,
  INDEX `fk_interventionId_idx` (`interventionId` ASC) VISIBLE,
  CONSTRAINT `fk_moodId`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_interventionId`
    FOREIGN KEY (`interventionId`)
    REFERENCES `interventions` (`interventionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

  CREATE TABLE `userInterventions` (
  `userInterventionId` INT NOT NULL AUTO_INCREMENT,
  `interventionName` VARCHAR(45) NOT NULL,
  `interventionDesc` VARCHAR(200) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`userInterventionId`),
  UNIQUE INDEX `userInterventionId_UNIQUE` (`userInterventionId` ASC) VISIBLE,
  INDEX `fk_userInterventions_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_userInterventions_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);



CREATE TABLE `userLogs` (
  `logId` INT NOT NULL AUTO_INCREMENT,
  `createDate` DATE NOT NULL,
  `createTime` TIME NOT NULL,
  `moodId` INT NULL,
  `subMoodId` INT NULL,
  `subSubMoodId` INT NULL,
  `userId` INT NOT NULL,
  `interventionId` INT,
  PRIMARY KEY (`logId`),
  CONSTRAINT `fk_userLogs_moodId`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userLogs_subMoodId`
    FOREIGN KEY (`subMoodId`)
    REFERENCES `sub_moods` (`subMoodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userLogs_subSubMoodId`
    FOREIGN KEY (`subSubMoodId`)
    REFERENCES `sub_sub_moods` (`subSubMoodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userLogs_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `userInterventionMoods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userInterventionId` INT NOT NULL,
  `moodId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_intervention_mood_unique` (`moodId`, `userInterventionId`) VISIBLE,
  INDEX `fk_moodId_idx` (`moodId` ASC) VISIBLE,
  INDEX `fk_userInterventionId_idx` (`userInterventionId` ASC) VISIBLE,
  CONSTRAINT `fk_userIntervention_moodId`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userInterventionId`
    FOREIGN KEY (`userInterventionId`)
    REFERENCES `userInterventions` (`userInterventionId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);



INSERT INTO users
	(firstName, lastName, email, password)
VALUES 
  ("James", "Butt", "james.butt@gmail.com", "password1"),
  ("Josephine", "Darakjy", "josephine.darakjy@gmail.com", "password2");
  

INSERT INTO moods
	(moodName, moodDesc)
VALUES 
  ( "Joy", null),
  ("Love", null),
  ("Surprise", null),
  ("Sadness", null),
  ("Anger", null),
  ("Fear", null);



INSERT INTO sub_moods (moodId, subMoodName, subMoodDesc)
VALUES
    (1, "Euphoric", null),
    (1, "Excited", null),
    (1, "Optimistic", null),
    (1, "Proud", null),
    (1, "Cheerful", null),
    (1, "Happy", null),
    (1, "Content", null),
    (1, "Peaceful", null),
	  (2, "Enchanted", null),
    (2, "Romantic", null),
    (2, "Affectionate", null),
    (2, "Sentimental", null),
    (2, "Grateful", null),
    (3, "Moved", null),
    (3, "Overcome", null),
    (3, "Amazed", null),
    (3, "Confused", null),
    (3, "Stunned", null),
    (4, "Gloomy", null),
    (4, "Lonely", null),
    (4, "Shameful", null),
    (4, "Disappointed", null),
    (4, "Unhappy", null),
    (4, "Hurt", null),
    (5, "Disgusted", null),
    (5, "Jealous", null),
    (5, "Irritable", null),
    (5, "Exasperated", null),
    (5, "Enraged", null),
    (6, "Horrified", null),
    (6, "Nervous", null),
    (6, "Insecure", null),
    (6, "Terrified", null),
    (6, "Scared", null);

INSERT INTO interventions
	(interventionId, interventionName, interventionDesc)
VALUES 
  (11, "Scribbling", "scribble through paper"),
  (12, "Log", "I listened to music"),
  (13, "Journal", "write down your feelings"),
  (14, "Gratitude", "what are you grateful for");


INSERT INTO mood_interventions
  (moodId, interventionId)

VALUES
(1, 11),
(1, 13)


ALTER TABLE `sub_moods` ADD COLUMN `tier` INT NOT NULL;
ALTER TABLE `sub_sub_moods` ADD COLUMN `tier` INT NOT NULL;