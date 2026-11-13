-- Wojtek Marek's testimonial stays on the site, as it was written. The previous migration
-- (20261113120000) hid it; this approves it again. It can be run again without effect.
-- The previous migration overwrote reviewedAt, which orders the testimonials, so it is set back to
-- the time the review was written, the closest value left.
UPDATE "Review" AS r
SET "status" = 'approved', "reviewedAt" = r."createdAt"
FROM "User" AS u
WHERE r."userId" = u."id"
  AND u."name" = 'Wojtek Marek'
  AND r."status" = 'rejected'
  AND r."body" LIKE '%Piotr and Mateusz%';
