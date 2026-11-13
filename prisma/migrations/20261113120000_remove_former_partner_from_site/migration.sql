-- Mateusz no longer works at Tactical Tennis Lab, and no profile or testimonial may suggest that
-- ATP players review the videos. This is a one off data fix; it can be run again without effect.

-- 1. Remove his coach profile (shown on the home page and on /coaches). Ids and names were read
--    from the live site on 2026-11-13, and the name is checked as well so nothing else can match.
DELETE FROM "Coach"
WHERE "id" = 'cmtiksfz70001p0q5r3i8di6z' AND "name" = 'Mateusz';

-- 2. Piotr's profile: certified ATP, ITF Level 2 and PZT coach, without "Former ATP player".
--    Previous text, for the record: "Former ATP player and Polish National Champion on multiple
--    occasions. ITF Level 2, PZT, ATP, and Tennis Talents certified. Career high ITF Junior ranking
--    #240, with top Tennis Europe rankings across multiple age categories. Coached national team
--    players and worked at academies in Italy and China. Trained by Davor Grgic, former coach of WTA
--    Top 20 player Donna Vekic."
UPDATE "Coach"
SET "bio" = 'ATP, ITF Level 2, PZT and Tennis Talents certified coach. Polish National Champion on multiple occasions. Career high ITF Junior ranking #240, with top Tennis Europe rankings across multiple age categories. Coached national team players and worked at academies in Italy and China. Trained by Davor Grgic, former coach of WTA Top 20 player Donna Vekic.'
WHERE "id" = 'cmtiksfz70000p0q5b7wh36o8' AND "name" = 'Piotr';

-- 3. The client testimonial that recommends "Piotr and Mateusz" is hidden, not deleted: the author's
--    words stay in the database, and it can be approved again on /reviews/admin.
UPDATE "Review"
SET "status" = 'rejected', "reviewedAt" = NOW()
WHERE "status" = 'approved' AND "body" LIKE '%Piotr and Mateusz%';
