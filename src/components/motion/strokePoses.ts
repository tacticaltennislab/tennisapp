/**
 * Simplified serve poses for the stroke-analysis illustration. Coordinates
 * are in a 400 x 520 box, the player faces right (toward the net).
 * These are illustrations, not measurements: the section says so.
 */
export type Pt = [number, number];

export interface Pose {
  head: Pt;
  neck: Pt;
  shoulder: Pt;
  hip: Pt;
  elbowL: Pt;
  handL: Pt;
  elbowR: Pt;
  handR: Pt;
  kneeL: Pt;
  footL: Pt;
  kneeR: Pt;
  footR: Pt;
  /** End of the racquet handle, where the frame starts. */
  tip: Pt;
  ball?: Pt;
}

export const POSES: Pose[] = [
  // 0: stance
  {
    head: [200, 150], neck: [200, 178], shoulder: [200, 190], hip: [198, 300],
    elbowL: [236, 236], handL: [262, 250],
    elbowR: [186, 244], handR: [204, 292],
    kneeL: [190, 392], footL: [182, 488], kneeR: [214, 392], footR: [232, 488],
    tip: [150, 372], ball: [264, 238],
  },
  // 1: toss as it happens, drifting behind the head
  {
    head: [194, 150], neck: [197, 178], shoulder: [199, 190], hip: [202, 300],
    elbowL: [186, 130], handL: [176, 72],
    elbowR: [176, 240], handR: [192, 285],
    kneeL: [194, 392], footL: [184, 488], kneeR: [218, 394], footR: [234, 488],
    tip: [134, 360], ball: [172, 44],
  },
  // 2: trophy position with the elbow below shoulder height
  {
    head: [200, 194], neck: [198, 222], shoulder: [198, 234], hip: [196, 332],
    elbowL: [236, 172], handL: [262, 114],
    elbowR: [160, 262], handR: [176, 204],
    kneeL: [176, 404], footL: [166, 488], kneeR: [226, 408], footR: [240, 488],
    tip: [150, 134], ball: [266, 92],
  },
  // 3: contact, legs finished
  {
    head: [212, 176], neck: [208, 206], shoulder: [208, 218], hip: [204, 312],
    elbowL: [238, 244], handL: [222, 268],
    elbowR: [226, 152], handR: [244, 100],
    kneeL: [200, 404], footL: [194, 484], kneeR: [214, 402], footR: [238, 466],
    tip: [258, 52], ball: [267, 30],
  },
];

/** The same toss as pose 1, corrected: in front of the head and into the court. */
export const TOSS_IDEAL: Pose = {
  head: [206, 150], neck: [203, 178], shoulder: [202, 190], hip: [198, 300],
  elbowL: [236, 130], handL: [258, 74],
  elbowR: [180, 240], handR: [194, 285],
  kneeL: [190, 392], footL: [182, 488], kneeR: [214, 394], footR: [232, 488],
  tip: [140, 360], ball: [264, 46],
};
