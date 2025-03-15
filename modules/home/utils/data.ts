import {
  type LucideIcon,
  LayoutIcon,
  LineChartIcon,
  MessageCircleIcon,
  SearchIcon,
  ShieldIcon,
  ThumbsUpIcon,
  UsersIcon,
} from "lucide-react";

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const keyFeatures = [
  {
    title: "Collaborative Topics",
    description: "Work together to create diverse and engaging topics.",
    icon: UsersIcon,
  },
  {
    title: "Engaging Discussions",
    description: "Participate in lively debates and share your thoughts.",
    icon: MessageCircleIcon,
  },
  {
    title: "Intuitive Interface",
    description: "Navigate effortlessly with our intuitive design.",
    icon: LayoutIcon,
  },
  {
    title: "Personalized Recommendations",
    description: "Discover topics tailored to your interests.",
    icon: ThumbsUpIcon,
  },
  {
    title: "Advanced Search",
    description: "Find exactly what you're looking for with ease.",
    icon: SearchIcon,
  },
  {
    title: "Secure Authentication",
    description: "Stay protected with our robust security measures.",
    icon: ShieldIcon,
  },
];

export const whyToChooseUsFeatures = [
  {
    title: "Discover",
    description: "Explore a vast array of topics curated by our community.",
    icon: SearchIcon,
  },
  {
    title: "Engage",
    description:
      "Participate in meaningful discussions and share your insights.",
    icon: MessageCircleIcon,
  },
  {
    title: "Grow",
    description:
      "Expand your knowledge and connect with like-minded individuals.",
    icon: LineChartIcon,
  },
];
