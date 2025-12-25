import { Instagram, Github, Globe } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/gabrielnathanaelp?igsh=MXN5YXRqZ2Y0OXU0bw==",
      icon: Instagram,
    },
    {
      name: "GitHub",
      url: "https://github.com/GabrielNathanael",
      icon: Github,
    },
    {
      name: "Website",
      url: "https://gabrielnathanael.site/",
      icon: Globe,
    },
  ];

  return (
    <footer className="w-full mt-8 py-6 border-t border-stone-200 dark:border-neutral-800">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-slate-600 dark:text-neutral-400">
          Created by Gabriel Nathanael
        </p>
        <div className="flex gap-4">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700 transition-colors"
                aria-label={social.name}
              >
                <Icon className="w-5 h-5 text-slate-700 dark:text-neutral-300" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
