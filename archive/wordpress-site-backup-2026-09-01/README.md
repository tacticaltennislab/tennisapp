# WordPress site backup — 2026-09-01

Raw HTML snapshot of the old GoDaddy Website Builder / WordPress site at
`tacticaltennislab.com`, taken from its staging URL
(`https://1209408.eu13.myftpupload.com`) right before pointing the
`tacticaltennislab.com` DNS at the new Next.js app on Vercel.

This is a content safety net, not a restorable WordPress backup — it
does not include the WordPress database, plugin/theme config, or a
media library export. The staging site itself should remain live at
the myftpupload.com URL independent of the tacticaltennislab.com DNS
change (GoDaddy Website Builder sites keep their own default URL
regardless of what custom domain points at them). For a real restore
point, use GoDaddy's own site backup/export tools from the WordPress
admin dashboard.

## Contents

- `home.html`, `about.html`, `services.html` — rendered HTML of the
  three published pages found on the site.
- `wp-pages.json` — WordPress REST API dump of registered "page" post
  type content (only Home and About; Services is not a standard page,
  likely an Elementor landing page, hence the separate HTML capture).
- `wp-posts.json` — WordPress REST API dump of blog posts. Only
  contains the default "Hello world!" placeholder post; no real blog
  content existed.

Note: the site's media library was empty via the REST API at capture
time, so no images were separately archived.
