DROP TABLE IF EXISTS users, userLogs, moods, interventions;

CREATE TABLE `users` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `userId_UNIQUE` (`userId` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE);


CREATE TABLE `moods` (
  `moodId` INT NOT NULL AUTO_INCREMENT,
  `moodName` VARCHAR(50) NOT NULL,
  `moodDesc` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`moodId`),
  UNIQUE INDEX `moodId_UNIQUE` (`moodId` ASC) VISIBLE);

CREATE TABLE `interventions` (
  `interventionId` INT NOT NULL AUTO_INCREMENT,
  `interventionName` VARCHAR(45) NOT NULL,
  `interventionDesc` VARCHAR(45) NOT NULL,
  `moodId` INT NOT NULL,
  PRIMARY KEY (`interventionId`),
  UNIQUE INDEX `interventionId_UNIQUE` (`interventionId` ASC) VISIBLE,
  INDEX `fk_moodId_idx` (`moodId` ASC) VISIBLE,
  CONSTRAINT `fk_moodId`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

CREATE TABLE `userLogs` (
  `logId` INT NOT NULL AUTO_INCREMENT,
  `createDate` DATE NOT NULL,
  `createTime` DATETIME NOT NULL,
  `moodId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`logId`),
  UNIQUE INDEX `logId_UNIQUE` (`logId` ASC) VISIBLE,
  INDEX `fk_moodId_idx` (`moodId` ASC) VISIBLE,
  INDEX `fk_userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_moodId_logs`
    FOREIGN KEY (`moodId`)
    REFERENCES `moods` (`moodId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_userId`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`userId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);




INSERT INTO users
	(firstName, lastName, email, userName, password)
VALUES 
  ("James", "Butt", "james.butt@gmail.com", "james_butt", "password1"),
  ("Josephine", "Darakjy", "josephine.darakjy@gmail.com", "josephine_darakjy", "password2"),
  ("Art", "Venere", "art.venere@gmail.com", "art_venere", "password3"),
  ("Lenna", "Paprocki", "lenna.paprocki@gmail.com", "lenna_paprocki", "password4"),
  ("Donette", "Foller", "donette.foller@gmail.com", "donette_foller", "password5"),
  ("Simona", "Morasca", "simona.morasca@gmail.com", "simona_morasca", "password6"),
  ("Mitsue", "Tollner", "mitsue.tollner@gmail.com", "mitsue_tollner", "password7"),
  ("Leota", "Dilliard", "leota.dilliard@gmail.com", "leota_dilliard", "password8"),
  ("Sage", "Wieser", "sage.wieser@gmail.com", "sage_wieser", "password9"),
  ("Kris", "Marrier", "kris.marrier@gmail.com", "kris_marrier", "password10");

INSERT INTO moods
	(moodId, moodName, moodDesc)
VALUES 
  (001, "Anger", "feeling mad"),
  (002, "Joyful", "Feeling happy"),
  (003, "Sad", "feeling down"),
  (004, "Bored", "feeling blah");

INSERT INTO interventions
	(interventionId, interventionName, interventionDesc, moodId)
VALUES 
  (11, "Scribbling", "scribble through paper", 001),
  (12, "Log", "I listened to music", 002),
  (13, "Journal", "write down your feelings", 003),
  (14, "Gratitude", "what are you grateful for", 004);
