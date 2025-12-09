module.exports = async () => {
  const fs = require("fs");
  const os = require("os");

  const repoUrl = "https://github.com/amirrezasalimi/comfyEz";
  const appDir = "app";
  const port = 4000; // change if needed

  const isWindows = os.platform() === "win32";
  const exists = fs.existsSync(appDir);

  const steps = [];

  // Step 0: Install Bun if missing
  const bunCheckCmd = isWindows
    ? "if (!(Get-Command bun -ErrorAction SilentlyContinue)) { winget install bun }"
    : "if ! command -v bun >/dev/null 2>&1; then curl -fsSL https://bun.sh/install | bash; fi";

  steps.push({
    method: "shell.run",
    params: { message: bunCheckCmd },
  });

  // Step 1: Clone or pull repo
  if (exists) {
    steps.push({
      method: "shell.run",
      params: { path: appDir, message: "git pull" },
    });
  } else {
    steps.push({
      method: "shell.run",
      params: { message: `git clone ${repoUrl} ${appDir}` },
    });
  }

  // Step 2: Install dependencies
  steps.push({
    method: "shell.run",
    params: {
      path: appDir,
      message: isWindows
        ? `powershell -Command "$env:PORT=${port}; bun install"`
        : `PORT=${port} bun install`,
    },
  });

  // Step 3: Start the Bun app in dev mode
  steps.push({
    method: "shell.run",
    params: {
      path: appDir,
      message: isWindows
        ? `powershell -Command "$env:PORT=${port}; bun dev"`
        : `PORT=${port} bun dev`,
    },
  });

  return {
    daemon: true,
    run: steps,
  };
};
