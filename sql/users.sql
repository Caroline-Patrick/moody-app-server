DROP TABLE IF EXISTS users, userLogs, moods, interventions;

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
  `moodDesc` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`moodId`),
  UNIQUE INDEX `moodId_UNIQUE` (`moodId` ASC) VISIBLE);

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
  `moodId` INT NOT NULL,
  `userId` INT NOT NULL,
  `interventionId` INT, -- Add this line to include the interventionId column
  PRIMARY KEY (`logId`),
  UNIQUE INDEX `logId_UNIQUE` (`logId` ASC) VISIBLE,
  INDEX `fk_userLogs_moodId_idx` (`moodId` ASC) VISIBLE,
  INDEX `fk_userLogs_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_userLogs_moodId` -- Updated constraint name
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userLogs_userId` -- Updated constraint name
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
  ("Josephine", "Darakjy", "josephine.darakjy@gmail.com", "password2"),
  ("Art", "Venere", "art.venere@gmail.com",  "password3"),
  ("Lenna", "Paprocki", "lenna.paprocki@gmail.com", "password4"),
  ("Donette", "Foller", "donette.foller@gmail.com", "password5"),
  ("Simona", "Morasca", "simona.morasca@gmail.com",  "password6"),
  ("Mitsue", "Tollner", "mitsue.tollner@gmail.com", "password7"),
  ("Leota", "Dilliard", "leota.dilliard@gmail.com",  "password8"),
  ("Sage", "Wieser", "sage.wieser@gmail.com",  "password9"),
  ("Kris", "Marrier", "kris.marrier@gmail.com",  "password10");

INSERT INTO moods
	(moodId, moodName, moodDesc)
VALUES 
  (001, "Anger", "feeling mad"),
  (002, "Joyful", "Feeling happy"),
  (003, "Sad", "feeling down"),
  (004, "Bored", "feeling blah");

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