/**
 * SAMPLE DATA, used only by the clearly labelled demo mode at /dashboard?demo=1 (admins, on sales
 * calls). None of this is stored, sent or tied to a real account.
 */

import type { Analysis } from "@/lib/analysisTypes";

export type { Analysis, Feedback, Observation, ObservationKind } from "@/lib/analysisTypes";
export { formatClock } from "@/lib/analysisTypes";

export const PLAYER = { name: "Alex Morgan", initials: "AM", email: "alex.morgan@example.com" };

export const ANALYSES: Analysis[] = [
  {
    id: "serve-deuce",
    title: "Serve, deuce side practice",
    service: "Stroke Fix",
    status: "reviewed",
    submittedAt: "12 Oct 2026",
    reviewedAt: "14 Oct 2026",
    coach: "Piotr",
    durationSec: 48,
    fileName: "serve_deuce_side.mov",
    fileSize: "186 MB",
    focus: ["Serve"],
    playerNote:
      "My first serve feels rushed and I lose power when I get tired. Filmed from the side, about 15 serves in a row.",
    observations: [
      {
        id: "o1",
        t: 4,
        kind: "strength",
        title: "Balanced stance",
        text: "Feet are shoulder width apart and the weight is evenly spread. The rhythm before the toss is calm and repeatable.",
        pin: { x: 46, y: 78 },
      },
      {
        id: "o2",
        t: 9,
        kind: "issue",
        title: "Toss drifts behind the head",
        text: "The ball is released about a ball width behind your head. That pulls the contact point back and makes you lean to reach it.",
        pin: { x: 40, y: 18 },
      },
      {
        id: "o3",
        t: 14,
        kind: "issue",
        title: "Shallow racquet drop",
        text: "The elbow stays low, so the racquet never reaches the back scratch position. Less racquet speed is built before contact.",
        pin: { x: 52, y: 38 },
      },
      {
        id: "o4",
        t: 19,
        kind: "issue",
        title: "Legs push late",
        text: "Knee bend peaks after the toss is already at its highest point, so the leg drive arrives once the swing has started.",
        pin: { x: 48, y: 70 },
      },
      {
        id: "o5",
        t: 26,
        kind: "strength",
        title: "Clear pronation",
        text: "Good forearm rotation and wrist snap through contact. This is the part of the motion to keep exactly as it is.",
        pin: { x: 56, y: 22 },
      },
      {
        id: "o6",
        t: 33,
        kind: "tactical",
        title: "Second serve is predictable",
        text: "Most second serves land in the middle of the box. Use the body and the T more on important points.",
        pin: { x: 62, y: 60 },
      },
      {
        id: "o7",
        t: 41,
        kind: "issue",
        title: "Slow recovery after the serve",
        text: "Weight finishes on the heels, so the first step toward the return is late.",
        pin: { x: 44, y: 84 },
      },
    ],
    feedback: {
      strengths: [
        "Balanced, repeatable stance and pre-serve rhythm.",
        "Clear pronation and wrist snap at contact.",
        "Consistent toss height from serve to serve.",
      ],
      issues: [
        {
          title: "Toss placement",
          detail:
            "The toss lands behind the head. It is the root cause of the lean and of the late contact you feel when you are tired.",
        },
        {
          title: "Racquet drop and elbow height",
          detail: "The elbow stays low, which shortens the swing path and costs racquet head speed.",
        },
        {
          title: "Timing of the leg drive",
          detail: "The knee bend peaks after the toss. The legs should load while the ball is rising.",
        },
      ],
      tactical: [
        "Mix the second serve between the body and the T on break points and at 30-30.",
        "After a first serve wide, expect the short ball and be ready to step in.",
      ],
      priorities: [
        "Move the toss about 20 cm forward and slightly into the court.",
        "Drill the trophy position: elbow up, three sets of ten shadow swings.",
        "Start the knee bend as the toss rises, not after it peaks.",
      ],
    },
  },
  {
    id: "match-set-2",
    title: "Match vs club rival, set 2",
    service: "Match IQ: Short",
    status: "awaiting",
    submittedAt: "21 Oct 2026",
    durationSec: 2410,
    fileName: "club_match_set2.mp4",
    fileSize: "412 MB",
    focus: ["Tactical", "Serve"],
    playerNote: "I keep losing long rallies from the backhand side. Behind the baseline camera, second set only.",
    observations: [],
  },
  {
    id: "forehand-crosscourt",
    title: "Forehand, cross court rally",
    service: "Stroke Fix",
    status: "reviewed",
    submittedAt: "21 Sep 2026",
    reviewedAt: "23 Sep 2026",
    coach: "Mateusz",
    durationSec: 36,
    fileName: "forehand_rally.mp4",
    fileSize: "94 MB",
    focus: ["Forehand"],
    playerNote: "Forehand breaks down when the ball comes in high.",
    observations: [
      {
        id: "f1",
        t: 6,
        kind: "issue",
        title: "Late preparation",
        text: "The racquet is still going back when the ball bounces. Start the turn as soon as you read the direction.",
        pin: { x: 40, y: 36 },
      },
      {
        id: "f2",
        t: 15,
        kind: "strength",
        title: "Good depth",
        text: "Most cross court balls land past the service line.",
        pin: { x: 66, y: 30 },
      },
    ],
    feedback: {
      strengths: ["Good depth and direction on cross court balls."],
      issues: [{ title: "Late preparation", detail: "The turn starts after the bounce, which crowds the contact point." }],
      tactical: ["Aim higher over the net on high balls to buy time."],
      priorities: ["Start the shoulder turn on the opponent's contact, not on the bounce."],
    },
  },
];

export interface PlanExercise {
  id: string;
  name: string;
  detail: string;
}

export interface PlanSession {
  id: string;
  number: number;
  week: number;
  title: string;
  objective: string;
  duration: string;
  exercises: PlanExercise[];
}

export const PLAN = {
  title: "Serve development, 4 weeks",
  author: "Piotr",
  basedOn: "Serve, deuce side practice",
  startedAt: "14 Oct 2026",
  goal: "Move the toss forward, build a full trophy position and time the leg drive, so the serve stays powerful late in a match.",
  sessions: [
    {
      id: "s1",
      number: 1,
      week: 1,
      title: "Toss consistency",
      objective: "Release the ball in the same place every time, in front of the head and slightly into the court.",
      duration: "25 min",
      exercises: [
        { id: "s1e1", name: "Toss and catch", detail: "3 sets of 10. Catch the ball at full arm extension without moving your feet." },
        { id: "s1e2", name: "Toss to a target", detail: "Place a racquet on the ground. 20 tosses, land the ball inside the frame." },
        { id: "s1e3", name: "Toss without a swing, then serve", detail: "5 tosses with no swing, then 5 serves. Compare the toss height." },
      ],
    },
    {
      id: "s2",
      number: 2,
      week: 1,
      title: "Trophy position",
      objective: "Reach a balanced trophy position with the elbow up before the racquet drops.",
      duration: "25 min",
      exercises: [
        { id: "s2e1", name: "Shadow swings, pause at trophy", detail: "3 sets of 10. Hold the position for one second, elbow at shoulder height." },
        { id: "s2e2", name: "Wall mirror check", detail: "Film yourself from the side for 5 swings and check the elbow height." },
      ],
    },
    {
      id: "s3",
      number: 3,
      week: 2,
      title: "Leg drive timing",
      objective: "Start the knee bend while the ball is rising, so the legs load before the swing.",
      duration: "30 min",
      exercises: [
        { id: "s3e1", name: "Toss, bend, hold", detail: "3 sets of 8. Bend as the ball rises and freeze at the top of the toss." },
        { id: "s3e2", name: "Half speed serves", detail: "2 sets of 10 serves at 60 percent, focusing on the bend then the push." },
        { id: "s3e3", name: "Record and review", detail: "Film 5 serves from the side and check where the knee bend peaks." },
      ],
    },
    {
      id: "s4",
      number: 4,
      week: 2,
      title: "Contact point and pronation",
      objective: "Make contact up and in front, keeping the pronation that already works.",
      duration: "30 min",
      exercises: [
        { id: "s4e1", name: "Serve to a high target", detail: "Hit 15 serves aiming at a cone placed at net height on the far side." },
        { id: "s4e2", name: "Contact freeze", detail: "10 serves. After contact, freeze for one second and check where you are." },
      ],
    },
    {
      id: "s5",
      number: 5,
      week: 3,
      title: "Rhythm at match speed",
      objective: "Put the full motion together at 80 percent and keep the rhythm for a full service game.",
      duration: "30 min",
      exercises: [
        { id: "s5e1", name: "Service games on your own", detail: "4 service games of 8 points, count the first serves in." },
        { id: "s5e2", name: "Routine before each serve", detail: "Use the same two bounces and one breath every time." },
      ],
    },
    {
      id: "s6",
      number: 6,
      week: 3,
      title: "Placement: T, body, wide",
      objective: "Direct the serve with the toss and the shoulders, not with the arm alone.",
      duration: "30 min",
      exercises: [
        { id: "s6e1", name: "Three target drill", detail: "10 serves each to the T, the body and wide. Write down how many landed." },
        { id: "s6e2", name: "Second serve variety", detail: "10 second serves, mixing body and T, with spin." },
      ],
    },
    {
      id: "s7",
      number: 7,
      week: 4,
      title: "Match pressure",
      objective: "Keep the same serve at 30-30 and on break points.",
      duration: "40 min",
      exercises: [
        { id: "s7e1", name: "Pressure service games", detail: "Play 3 service games starting at 30-30, with a partner or on your own." },
        { id: "s7e2", name: "Send a new video", detail: "Film a full service game from the side and upload it for review." },
      ],
    },
  ] as PlanSession[],
};

export interface ChatMessage {
  id: string;
  from: "coach" | "player";
  author: string;
  at: string;
  body: string;
}

export const MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    from: "coach",
    author: "Piotr",
    at: "14 Oct, 18:20",
    body: "Hi Alex, your serve analysis is ready. Start with the toss: it is the one change that will fix most of what you see at 0:14 and 0:19.",
  },
  {
    id: "m2",
    from: "player",
    author: "Alex",
    at: "14 Oct, 19:05",
    body: "Thanks! Quick question: should I toss with a bent or a straight arm?",
  },
  {
    id: "m3",
    from: "coach",
    author: "Piotr",
    at: "15 Oct, 09:12",
    body: "Straight, and let go at about eye level. Think of lifting the ball, not throwing it. Session 1 in your plan has two drills for exactly this.",
  },
  {
    id: "m4",
    from: "player",
    author: "Alex",
    at: "15 Oct, 09:40",
    body: "Got it. I will upload new footage after session 3.",
  },
  {
    id: "m5",
    from: "coach",
    author: "Mateusz",
    at: "22 Oct, 10:03",
    body: "I received your match video and will review the second set this week. If you can, tell me which games felt worst so I can start there.",
  },
];

export interface Order {
  id: string;
  date: string;
  item: string;
  amount: string;
  status: string;
  note: string;
}

export const ORDERS: Order[] = [
  { id: "1043", date: "21 Oct 2026", item: "Match Analysis", amount: "$99.00", status: "Paid", note: "One time" },
  { id: "1038", date: "12 Oct 2026", item: "4 Week Training Program", amount: "$99.00", status: "Paid", note: "One time" },
  { id: "1037", date: "12 Oct 2026", item: "Stroke Analysis", amount: "$49.00", status: "Paid", note: "One time" },
];

export const FOCUS_OPTIONS = ["Serve", "Forehand", "Backhand", "Volleys", "Footwork", "Tactical", "Fitness", "Mental"];
