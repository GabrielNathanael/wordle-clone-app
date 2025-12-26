import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ statuses, todayKey, attempts }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const emojiGrid = statuses
      .map((row) =>
        row
          .map((status) => {
            if (status === "correct") return "🟩";
            if (status === "present") return "🟨";
            return "⬛";
          })
          .join("")
      )
      .join("\n");

    const text = `Wordply Challenge ${todayKey}\n${attempts}/6\n\n${emojiGrid}\n\nhttps://wordply.gabrielnathanael.site/`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-sm"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share Result</span>
        </>
      )}
    </button>
  );
}
