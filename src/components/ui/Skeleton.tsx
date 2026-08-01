interface SkeletonProps {
  variant?: "text" | "card" | "circle" | "image";
  className?: string;
}

const variantClasses = {
  text: "h-4 rounded-md",
  card: "h-32 rounded-2xl",
  circle: "h-12 w-12 rounded-full",
  image: "aspect-[4/3] rounded-xl",
};

export default function Skeleton({ variant = "text", className = "" }: SkeletonProps) {
  return <div className={`skeleton ${variantClasses[variant]} ${className}`} />;
}
