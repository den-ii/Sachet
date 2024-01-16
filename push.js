const path = require("path");

const installToADB = require("install-to-adb");
const launchApp = require("node-firefox-launch-app");
const resolveOwn = (relativePath) =>
  path.resolve(__dirname, "", relativePath);
const buildFolder = path.relative(
  process.cwd(),
  resolveOwn(path.join("", "build"))
);
installToADB(buildFolder)
  .then((res) => {
    console.log(res);
    console.log(buildFolder);
    return launchApp({
      manifestURL: res[0].app.manifestURL,
      client: res[0].client,
    });
  })
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    console.log("fail to push app to device");
    process.exit(1);
  });

///install
///install-to-adb
///node-firefox-launch-app
