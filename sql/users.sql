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


ALTER TABLE `moods` ADD COLUMN `tier` INT NOT NULL;
ALTER TABLE `sub_moods` ADD COLUMN `tier` INT NOT NULL;
ALTER TABLE `sub_sub_moods` ADD COLUMN `tier` INT NOT NULL;

UPDATE `moods` SET `tier` =1;
UPDATE `sub_moods` SET `tier` =2;
UPDATE `sub_sub_moods` SET `tier`=3;



INSERT INTO users
	(firstName, lastName, email, password)
VALUES 
  ("James", "Butt", "james@test.com", "password123"),
  ("Josephine", "Darakjy", "josephine@test.com", "password123");
  

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
    (1, "Peaceful", null);
    
INSERT INTO sub_moods (moodId, subMoodName, subMoodDesc)
VALUES
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

INSERT INTO sub_sub_moods (subMoodId, subSubMoodName, subSubMoodDesc)
	VALUES
		(1, "Jubilant", null),
        (1, "Elated", null),
        (2, "Zealous", null),
        (2, "Enthusiastic", null),
        (3, "Hopeful", null),
        (3, "Eager", null),
        (4, "Illustrious", null),
        (4, "Triumphant", null),
        (5, "Playful", null),
        (5, "Amused", null),
        (6, "Delighted", null),
        (6, "Jovial", null),
        (7, "Pleased", null),
        (7, "Satisfied", null),
        (8, "Tranquil", null),
        (8, "Serene", null),
        (9, "Enthralled", null),
        (9, "Rapturous", null), 
        (10, "Passionate", null),
        (10, "Enamored", null),
        (11, "Warm-hearted", null),
        (11, "Compassionate", null),
        (12, "Tender", null),
        (12, "Nostalgic", null),
        (13, "Appreciative", null),
        (13, "Thankful", null),
        (14, "Touched", null),
        (14, "Stimulated", null),
        (15, "Astounded", null),
        (15, "Speechless", null),
        (16, "Awe-struck", null),
        (16, "Astonished", null),
        (17, "Perplexed", null),
        (17, "Disillusioned", null),
        (18, "Bewildered", null),
        (18, "Shocked", null),
        (19, "Depressed", null),
        (19, "Hopeless", null),
        (20, "Neglected", null),
        (20, "Isolated", null),
        (21, "Guilty", null),
        (21, "Regretful", null),
        (22, "Displeased", null),
        (22, "Dismayed", null),
        (23, "Disheartened", null),
        (23, "Miserable", null),
        (24, "Disturbed", null),
        (24, "Agonized", null),
        (25, "Revolted", null),
        (25, "Contemptuous", null),
        (26, "Envious", null),
        (26, "Resentful", null),
        (27, "Aggravated", null),
        (27, "Annoyed", null),
        (28, "Frustrated", null),
        (28, "Agitated", null),
        (29, "Hostile", null),
        (29, "Hateful", null),
        (30, "Dreadful", null),
        (30, "Mortified", null),
        (31, "Anxious", null),
        (31, "Worried", null),
        (32, "Inadequate", null),
        (32, "Inferior", null),
        (33, "Hysterical", null),
        (33, "Panicked", null),
        (34, "Helpless", null),
        (34, "Frightened", null);
        
        
    


INSERT INTO interventions
	(interventionName, interventionDesc)
VALUES 
  ("Scribbling", "Use a pen to scribble through paper"),
  ("Walk", "Walk outside for 5-10 minutes"),
  ("Journal", "Write down the thoughts coming to mind"),
  ("Gratitude", "What is something you are grateful for?");

SELECT * FROM moods;
INSERT INTO mood_interventions
  (moodId, interventionId)

VALUES
(1, 4),
(5, 1),
(4, 3),
(5, 2);



