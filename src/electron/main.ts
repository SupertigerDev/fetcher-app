import { app, BrowserWindow, nativeTheme } from "electron";

// import { fileURLToPath } from "url";
// import { dirname, join } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const isDev = process.env.DEV != undefined;

function createWindow() {
  // nativeTheme.themeSource = "dark";
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // backgroundMaterial: "mica",

    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      webSecurity: false,
      // preload: join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools({ mode: "detach" });
  // if (isDev) {
  // } else {
  //   mainWindow.loadFile("dist/index.html");
  // }
}

app.whenReady().then(() => {
  createWindow();
});
