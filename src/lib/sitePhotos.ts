/**
 * Editorial photography slots for the homepage.
 *
 * Every slot starts empty on purpose: no stock or invented imagery. To add a
 * photo, put the file in /public/photos and replace `null` with an entry such
 * as:
 *
 *   hero: { src: "/photos/hero.jpg", alt: "A coach and player reviewing a serve", width: 2400, height: 1030 },
 *
 * Empty slots render nothing and the layout stays balanced without them.
 * See public/photos/README.md for sizes and subjects.
 */
export interface SitePhotoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SITE_PHOTOS: {
  hero: SitePhotoData | null;
  /** Stroke Analysis, Training Programs, Match Analysis (in that order). */
  services: [SitePhotoData | null, SitePhotoData | null, SitePhotoData | null];
  /** Coach portraits keyed by lowercase coach name, e.g. "piotr". */
  coaches: Record<string, SitePhotoData>;
} = {
  hero: null,
  services: [null, null, null],
  coaches: {},
};
