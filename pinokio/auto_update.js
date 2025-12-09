module.exports = async () => {
  const fs = require("fs");

  const repoUrl = "https://github.com/amirrezasalimi/comfyEz";
  const appDir = "app";

  const exists = fs.existsSync(appDir);

  let steps = [];

  // If project already exists → update
  if (exists) {
    steps.push({
      method: "shell.run",
      params: {
        path: appDir,
        message: "git pull",
      },
    });
  }

  // If project doesn't exist → clone
  else {
    steps.push({
      method: "shell.run",
      params: {
        message: `git clone ${repoUrl} ${appDir}`,
      },
    });
  }

  // Install/Update dependencies
  steps.push({
    method: "shell.run",
    params: {
      path: appDir,
      message: "bun install",
    },
  });

  // Start the Bun app
  steps.push({
    method: "shell.run",
    params: {
      path: appDir,
      message: "bun run start",
    },
  });

  return {
    daemon: true, // keep process running
    run: steps,
  };
};
