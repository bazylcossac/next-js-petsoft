import { cn } from "@/lib/utils";
function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={cn("font-bold text-2xl leading-6 ", className)}>
      {children}
    </h1>
  );
}
export default H1;
