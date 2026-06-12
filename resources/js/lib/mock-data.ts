import cafeImg from "@/assets/cafe.jpg";
import vinylImg from "@/assets/vinyl.jpg";
import sunsetImg from "@/assets/sunset.jpg";
import jazzImg from "@/assets/jazz.jpg";
import foodImg from "@/assets/food.jpg";
import injeraImg from "@/assets/injera.jpg";
import bookbarImg from "@/assets/bookbar.jpg";
import marketImg from "@/assets/market.jpg";
import cinemaImg from "@/assets/cinema.jpg";

export const images = {
  cafeImg,
  vinylImg,
  sunsetImg,
  jazzImg,
  foodImg,
  injeraImg,
  bookbarImg,
  marketImg,
  cinemaImg,
};

export type Place = {
  id: string;
  name: string;
  category: string;
  neighborhood: string;
  rating: number;
  reviews: number;
  priceRange: string;
  photo: string;
  caption: string;
  poster: { name: string; initials: string; handle: string };
  postedAt: string;
  likes: number;
  shares?: number;
  open: boolean;
  tags: string[];
};

export type BucketList = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  itemCount: number;
  completed: number;
  steals: number;
  shares?: number;
  visibility: "Public" | "Friends" | "Private";
  creator: { name: string; handle: string; initials: string };
  cover: string[];
  items: { id: string; name: string; done: boolean; placeId?: string }[];
};

export type Event = {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  photo: string;
  going: string[];
  description: string;
  shares?: number;
};

export const PLACES: Place[] = [
  {
    id: "archive-cafe",
    name: "The Archive Cafe",
    category: "Coffee Shop",
    neighborhood: "Kazanchis",
    rating: 4.9,
    reviews: 128,
    priceRange: "$$",
    photo: cafeImg,
    caption:
      "Best cortado in the city. The concrete walls and quiet vibe make it perfect for reading a physical book. No WiFi, just memories.",
    poster: { name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" },
    postedAt: "2h ago",
    likes: 124,
    open: true,
    tags: ["Kazanchis", "Coffee Shop"],
  },
  {
    id: "fendika",
    name: "Fendika Cultural Center",
    category: "Live Music",
    neighborhood: "Kazanchis",
    rating: 4.8,
    reviews: 312,
    priceRange: "$$",
    photo: jazzImg,
    caption:
      "The Azmari quartet on Friday nights is unmatched. The heart of Addis culture, get there before 8.",
    poster: { name: "Liya Kassa", initials: "LK", handle: "liya_k" },
    postedAt: "5h ago",
    likes: 287,
    open: true,
    tags: ["Kazanchis", "Traditional"],
  },
  {
    id: "yod-abyssinia",
    name: "Yod Abyssinia",
    category: "Restaurant",
    neighborhood: "Bole",
    rating: 4.7,
    reviews: 540,
    priceRange: "$$$",
    photo: foodImg,
    caption:
      "Sunday kitfo is the move. Order shared. The honey wine flows and the band starts at 8 sharp.",
    poster: { name: "Sara Bekele", initials: "SB", handle: "sara_b" },
    postedAt: "1d ago",
    likes: 412,
    open: true,
    tags: ["Bole", "Traditional"],
  },
  {
    id: "rooftop-21",
    name: "Rooftop 21",
    category: "Bar",
    neighborhood: "Bole",
    rating: 4.6,
    reviews: 89,
    priceRange: "$$$",
    photo: sunsetImg,
    caption:
      "Catch the 6pm sunset. The mountains turn copper and the city quiets down for a minute.",
    poster: { name: "Kidist A.", initials: "KA", handle: "kidist" },
    postedAt: "3d ago",
    likes: 156,
    open: false,
    tags: ["Bole", "Rooftop"],
  },
  {
    id: "mesob-kitchen",
    name: "Mesob Kitchen",
    category: "Restaurant",
    neighborhood: "Piazza",
    rating: 4.8,
    reviews: 401,
    priceRange: "$$",
    photo: injeraImg,
    caption:
      "Injera so fresh it's still warm. Beyaynetu on Wednesdays is a religion here. Bring two friends and order one platter.",
    poster: { name: "Liya Kassa", initials: "LK", handle: "liya_k" },
    postedAt: "6h ago",
    likes: 298,
    open: true,
    tags: ["Piazza", "Injera", "Vegan friendly"],
  },
  {
    id: "page-and-pour",
    name: "Page & Pour",
    category: "Wine Bar",
    neighborhood: "Kazanchis",
    rating: 4.7,
    reviews: 76,
    priceRange: "$$$",
    photo: bookbarImg,
    caption:
      "Half bookshop, half natural wine bar. Tuesday poetry nights. Ask for the Tigray red they only pour after 9pm.",
    poster: { name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" },
    postedAt: "12h ago",
    likes: 134,
    open: true,
    tags: ["Kazanchis", "Wine", "Books"],
  },
  {
    id: "merkato-spices",
    name: "Merkato Spice Row",
    category: "Hidden Gem",
    neighborhood: "Merkato",
    rating: 4.9,
    reviews: 210,
    priceRange: "$",
    photo: marketImg,
    caption:
      "The third alley past the textile stalls. Berbere ground while you wait. Bring small bills and patience — it's worth it.",
    poster: { name: "Sara Bekele", initials: "SB", handle: "sara_b" },
    postedAt: "2d ago",
    likes: 521,
    open: true,
    tags: ["Merkato", "Market", "Spice"],
  },
  {
    id: "tomoca-original",
    name: "Tomoca Original",
    category: "Coffee Shop",
    neighborhood: "Piazza",
    rating: 4.9,
    reviews: 1240,
    priceRange: "$",
    photo: cafeImg,
    caption:
      "The 1953 OG. Stand-up espresso bar, no seats, locals reading the paper. A cultural rite of passage.",
    poster: { name: "Kidist A.", initials: "KA", handle: "kidist" },
    postedAt: "4d ago",
    likes: 890,
    open: true,
    tags: ["Piazza", "Coffee", "Heritage"],
  },
  {
    id: "doro-house",
    name: "Doro House",
    category: "Restaurant",
    neighborhood: "Bole",
    rating: 4.6,
    reviews: 312,
    priceRange: "$$",
    photo: foodImg,
    caption:
      "They do exactly one thing — doro wat — and they do it for 30 years. Slow-cooked all day. Get there by 7.",
    poster: { name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" },
    postedAt: "1d ago",
    likes: 367,
    open: true,
    tags: ["Bole", "Doro", "Comfort"],
  },
];

export const LISTS: BucketList[] = [
  {
    id: "vinyl-bars",
    name: "Late Night Vinyl Bars",
    emoji: "🎷",
    description: "8 secret spots in Bole & Kazanchis",
    itemCount: 8,
    completed: 3,
    steals: 47,
    visibility: "Public",
    creator: { name: "Sara Bekele", handle: "sara_b", initials: "SB" },
    cover: [vinylImg, jazzImg, sunsetImg],
    items: [
      { id: "1", name: "Mama's Kitchen Vinyl Night", done: true },
      { id: "2", name: "Fendika Cultural Center", done: true, placeId: "fendika" },
      { id: "3", name: "Page & Pour", done: true, placeId: "page-and-pour" },
      { id: "4", name: "Black Rose Lounge", done: false },
      { id: "5", name: "Itegue Taitu Hotel Bar", done: false },
      { id: "6", name: "Jazzamba Live", done: false },
      { id: "7", name: "Mesob Soul Club", done: false },
      { id: "8", name: "Habesha Records Bar", done: false },
    ],
  },
  {
    id: "habesha-brunch",
    name: "Ultimate Habesha Brunch",
    emoji: "☕",
    description: "7 spots for the perfect Sunday kitfo",
    itemCount: 7,
    completed: 5,
    steals: 92,
    visibility: "Public",
    creator: { name: "Liya Kassa", handle: "liya_k", initials: "LK" },
    cover: [foodImg, cafeImg, injeraImg],
    items: [
      { id: "1", name: "Yod Abyssinia", done: true, placeId: "yod-abyssinia" },
      { id: "2", name: "Mesob Kitchen", done: true, placeId: "mesob-kitchen" },
      { id: "3", name: "Doro House", done: true, placeId: "doro-house" },
      { id: "4", name: "Sishu", done: true },
      { id: "5", name: "Effoi Pizza", done: true },
      { id: "6", name: "Lucy Restaurant", done: false },
      { id: "7", name: "Totot Traditional", done: false },
    ],
  },
  {
    id: "sunset-spots",
    name: "Best Sunset Spots",
    emoji: "🌅",
    description: "6 essential rooftops and overlooks",
    itemCount: 6,
    completed: 1,
    steals: 23,
    visibility: "Friends",
    creator: { name: "You", handle: "me", initials: "ME" },
    cover: [sunsetImg, cafeImg, jazzImg],
    items: [
      { id: "1", name: "Rooftop 21", done: true, placeId: "rooftop-21" },
      { id: "2", name: "Entoto Park overlook", done: false },
      { id: "3", name: "Sheraton terrace", done: false },
      { id: "4", name: "Radisson rooftop", done: false },
      { id: "5", name: "Tomoca hill", done: false },
      { id: "6", name: "Mount Yeka view", done: false },
    ],
  },
  {
    id: "hidden-gems",
    name: "Hidden Gems of Addis",
    emoji: "💎",
    description: "5 places only locals know",
    itemCount: 5,
    completed: 2,
    steals: 64,
    visibility: "Public",
    creator: { name: "Kidist A.", handle: "kidist", initials: "KA" },
    cover: [marketImg, bookbarImg, injeraImg],
    items: [
      { id: "1", name: "Merkato Spice Row", done: true, placeId: "merkato-spices" },
      { id: "2", name: "Page & Pour", done: true, placeId: "page-and-pour" },
      { id: "3", name: "Tomoca Original", done: false, placeId: "tomoca-original" },
      { id: "4", name: "Old Airport bookshop", done: false },
      { id: "5", name: "Shiro Meda fabric alley", done: false },
    ],
  },
];

export const EVENTS: Event[] = [
  {
    id: "jazz-night",
    name: "Jazz Night at Fendika",
    date: "SAT 14 JUN",
    time: "7:00 PM",
    venue: "Fendika Cultural Center",
    price: "300 ETB",
    photo: jazzImg,
    going: ["LK", "SB", "YM"],
    description:
      "The legendary Friday night sessions move to Saturday for one special evening. Azmari quartet plus surprise guests.",
  },
  {
    id: "rooftop-sounds",
    name: "Rooftop Sounds Vol. 4",
    date: "FRI 20 JUN",
    time: "5:30 PM",
    venue: "Rooftop 21",
    price: "Free entry",
    photo: sunsetImg,
    going: ["KA", "YM"],
    description: "Sunset DJ set with local talent. Bring cash for the bar.",
  },
  {
    id: "food-walk",
    name: "Bole Food Walk",
    date: "SUN 22 JUN",
    time: "12:00 PM",
    venue: "Starts at Yod Abyssinia",
    price: "800 ETB",
    photo: foodImg,
    going: ["SB"],
    description: "5 stops, 3 hours, all the kitfo. Limited to 12 people.",
  },
  {
    id: "rooftop-cinema",
    name: "Rooftop Cinema: Lamb (2015)",
    date: "THU 26 JUN",
    time: "7:30 PM",
    venue: "Kazanchis rooftop",
    price: "250 ETB",
    photo: cinemaImg,
    going: ["YM", "LK"],
    description: "Outdoor screening of Yared Zeleke's Lamb. Cushions, popcorn, and tej.",
  },
  {
    id: "spice-tour",
    name: "Merkato Spice Tour",
    date: "SAT 28 JUN",
    time: "9:00 AM",
    venue: "Merkato main gate",
    price: "500 ETB",
    photo: marketImg,
    going: ["SB", "KA"],
    description: "2-hour guided walk through spice row with a third-generation vendor.",
  },
  {
    id: "vinyl-poetry",
    name: "Vinyl & Poetry Tuesdays",
    date: "TUE 24 JUN",
    time: "8:00 PM",
    venue: "Page & Pour",
    price: "Free",
    photo: bookbarImg,
    going: ["YM"],
    description: "Open mic poetry between vinyl sets. Sign up at the door.",
  },
];

export const INTERESTS = [
  { id: "food", label: "Food", emoji: "🍽️" },
  { id: "events", label: "Events", emoji: "🎪" },
  { id: "hidden", label: "Hidden Gems", emoji: "💎" },
  { id: "cafes", label: "Cafes", emoji: "☕" },
  { id: "cinema", label: "Cinema", emoji: "🎬" },
  { id: "outdoors", label: "Outdoors", emoji: "🌳" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "nightlife", label: "Nightlife", emoji: "🌙" },
];

export const SUGGESTED_FRIENDS = [
  { name: "Liya Kassa", initials: "LK", proof: "12 places listed" },
  { name: "Yonas Mulugeta", initials: "YM", proof: "3 bucket lists" },
  { name: "Sara Bekele", initials: "SB", proof: "92 steals received" },
  { name: "Kidist A.", initials: "KA", proof: "8 places listed" },
];

export const NOTIFICATIONS = [
  { id: "1", text: "@liya_k stole your bucket list 'Best Sunset Spots'", time: "10m" },
  { id: "2", text: "Yonas completed an item on a list you follow", time: "1h" },
  { id: "3", text: "New event near you: Jazz Night at Fendika", time: "3h" },
  { id: "4", text: "Sara liked your restaurant listing", time: "1d" },
  { id: "5", text: "Your weekly digest is ready — 5 new places near you", time: "2d" },
];

export const ME = {
  name: "Liya Kassa",
  handle: "liya_k",
  city: "Addis Ababa",
  initials: "LK",
  stats: { listed: 12, lists: 4, steals: 47, followers: 218 },
};

// =========================
// Chats
// =========================

export type Share =
  | { kind: "place"; id: string }
  | { kind: "list"; id: string }
  | { kind: "event"; id: string };

export type ChatMessage = {
  id: string;
  sender: string; // initials, "ME" if from current user
  senderName?: string;
  time: string;
  text?: string;
  share?: Share;
};

export type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  members: { name: string; initials: string; handle: string }[];
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
};

export const CHATS: Chat[] = [
  {
    id: "weekend-crew",
    name: "Weekend Crew",
    isGroup: true,
    lastTime: "2m",
    unread: 3,
    members: [
      { name: "Liya Kassa", initials: "LK", handle: "liya_k" },
      { name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" },
      { name: "Sara Bekele", initials: "SB", handle: "sara_b" },
      { name: "Kidist A.", initials: "KA", handle: "kidist" },
    ],
    messages: [
      { id: "m1", sender: "SB", senderName: "Sara", time: "9:12", text: "ok crew — what's the move tonight?" },
      { id: "m2", sender: "YM", senderName: "Yonas", time: "9:14", text: "Fendika? azmari quartet is on" },
      { id: "m3", sender: "YM", senderName: "Yonas", time: "9:14", share: { kind: "place", id: "fendika" } },
      { id: "m4", sender: "ME", time: "9:18", text: "yes please. dinner first?" },
      { id: "m5", sender: "SB", senderName: "Sara", time: "9:20", share: { kind: "place", id: "mesob-kitchen" } },
      { id: "m6", sender: "SB", senderName: "Sara", time: "9:20", text: "beyaynetu @ Mesob, 7pm sharp" },
      { id: "m7", sender: "KA", senderName: "Kidist", time: "9:25", text: "I built us a whole night plan ↓" },
      { id: "m8", sender: "KA", senderName: "Kidist", time: "9:25", share: { kind: "list", id: "vinyl-bars" } },
    ],
  },
  {
    id: "sara-bekele",
    name: "Sara Bekele",
    isGroup: false,
    lastTime: "1h",
    unread: 1,
    members: [{ name: "Sara Bekele", initials: "SB", handle: "sara_b" }],
    messages: [
      { id: "m1", sender: "SB", senderName: "Sara", time: "Yesterday", text: "found your new favorite spot" },
      { id: "m2", sender: "SB", senderName: "Sara", time: "Yesterday", share: { kind: "place", id: "page-and-pour" } },
      { id: "m3", sender: "ME", time: "8:02", text: "oh this looks dangerous. saving it." },
      { id: "m4", sender: "SB", senderName: "Sara", time: "8:45", text: "also: spice tour saturday?" },
      { id: "m5", sender: "SB", senderName: "Sara", time: "8:45", share: { kind: "event", id: "spice-tour" } },
    ],
  },
  {
    id: "food-club",
    name: "Food Club 🍽️",
    isGroup: true,
    lastTime: "yesterday",
    unread: 0,
    members: [
      { name: "Liya Kassa", initials: "LK", handle: "liya_k" },
      { name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" },
      { name: "Sara Bekele", initials: "SB", handle: "sara_b" },
    ],
    messages: [
      { id: "m1", sender: "LK", senderName: "Liya", time: "Mon", text: "Brunch list updated ✨" },
      { id: "m2", sender: "LK", senderName: "Liya", time: "Mon", share: { kind: "list", id: "habesha-brunch" } },
      { id: "m3", sender: "YM", senderName: "Yonas", time: "Tue", text: "stealing this for Sunday" },
    ],
  },
  {
    id: "yonas-mulugeta",
    name: "Yonas Mulugeta",
    isGroup: false,
    lastTime: "3d",
    unread: 0,
    members: [{ name: "Yonas Mulugeta", initials: "YM", handle: "yonas_m" }],
    messages: [
      { id: "m1", sender: "YM", senderName: "Yonas", time: "Mon", share: { kind: "event", id: "rooftop-cinema" } },
      { id: "m2", sender: "YM", senderName: "Yonas", time: "Mon", text: "this you?" },
      { id: "m3", sender: "ME", time: "Mon", text: "lock it in 🎬" },
    ],
  },
];
