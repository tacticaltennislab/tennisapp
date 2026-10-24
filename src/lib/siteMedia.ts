/**
 * Photographs used on the homepage beyond the photo slots in sitePhotos.ts.
 * Every entry records where it came from so the credit on the page and
 * ASSETS.md always match the file that ships. Stock imagery is illustrative:
 * it is never presented as a client session.
 */
export interface SiteStill {
  src: string;
  width: number;
  height: number;
  /** Where the athlete sits in the frame, for portrait crops. */
  position: string;
  credit: { creator: string; creatorUrl: string; sourceUrl: string; licenseUrl: string };
}

export const SITE_STILLS: { process: SiteStill | null } = {
  process: {
    src: "/media/hero-serve-poster.jpg",
    width: 1280,
    height: 720,
    position: "56% 50%",
    credit: {
      creator: "Antoni Shkraba",
      creatorUrl: "https://www.pexels.com/@shkrabaanthony/",
      sourceUrl: "https://www.pexels.com/video/a-tennis-player-serving-the-ball-4902771/",
      licenseUrl: "https://www.pexels.com/license/",
    },
  },
};
