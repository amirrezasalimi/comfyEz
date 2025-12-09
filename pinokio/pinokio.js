module.exports = {
  title: "ComfyEz",
  description: `comfyEz – feature-rich web interface designed to interact with a local ComfyUI
Repository: https://github.com/amirrezasalimi/comfyEz

Requirements:
• You MUST have ComfyUI installed.
• ComfyUI must be running BEFORE you start comfyEz.
• ComfyUI must allow CORS.

Run ComfyUI using or allow cors in ComfyUI Desktop:
python main.py --cors_origin="*" --listen

Usage:
1. Start your ComfyUI instance with CORS enabled.
2. Return here and press "Start comfyEz".
3. Script will automatically clone/update the repo and start comfyEz.

If this is your first time running comfyEz, it will auto-install all dependencies.
`,
  menu: [
    {
      text: "Auto Update & Run",
      href: "auto_update.js",
    },
  ],
};
