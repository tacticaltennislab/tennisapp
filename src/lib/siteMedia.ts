/**
 * Video used on the homepage. Every entry records where it came from so the
 * credit on the page and ASSETS.md always match the file that ships.
 * Stock footage is illustrative: it is never presented as a client session.
 */
export interface SiteVideo {
  mp4: string;
  poster: { src: string; width: number; height: number };
  alt: string;
  credit: { creator: string; creatorUrl: string; sourceUrl: string; licenseUrl: string };
}

export const SITE_VIDEOS: { hero: SiteVideo | null } = {
  hero: {
    mp4: "/media/hero-serve.mp4",
    poster: { src: "/media/hero-serve-poster.jpg", width: 1280, height: 720 },
    alt: "A tennis player preparing to serve on a clay court",
    credit: {
      creator: "Antoni Shkraba",
      creatorUrl: "https://www.pexels.com/@shkrabaanthony/",
      sourceUrl: "https://www.pexels.com/video/a-tennis-player-serving-the-ball-4902771/",
      licenseUrl: "https://www.pexels.com/license/",
    },
  },
};
