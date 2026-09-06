import { useEffect, useState } from "react";

type TypewriterProps = {
  text: string;
  typingSpeed?: number; // ms per char while typing
  deletingSpeed?: number; // ms per char while deleting
  pauseAfterType?: number; // ms to wait after fully typed
  pauseAfterDelete?: number; // ms to wait after fully deleted
  className?: string;
};

/**
 * Continuously types and deletes its text like a classic typewriter effect.
 */
export function Typewriter({
  text,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseAfterType = 1600,
  pauseAfterDelete = 500,
  className,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "idle">(
    "idle",
  );

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "idle":
        timeout = setTimeout(() => setPhase("typing"), pauseAfterDelete);
        break;
      case "typing": {
        if (displayed.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => setPhase("pausing"), pauseAfterType);
        }
        break;
      }
      case "pausing":
        timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
        break;
      case "deleting": {
        if (displayed.length > 0) {
          timeout = setTimeout(() => {
            setDisplayed(text.slice(0, displayed.length - 1));
          }, deletingSpeed);
        } else {
          timeout = setTimeout(() => setPhase("typing"), pauseAfterDelete);
        }
        break;
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, displayed, text, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{displayed}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-[1px] -translate-y-px animate-pulse bg-primary align-middle"
        style={{ height: "0.85em" }}
      >
        &nbsp;
      </span>
    </span>
  );
}
