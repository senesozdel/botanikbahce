const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000' 
      : `file://${path.join(__dirname, './build/index.html')}` 
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => (mainWindow = null));
}

// Electron hazır olduğunda pencereyi oluştur
app.on('ready', createWindow);

// Tüm pencereler kapandığında uygulamayı kapat (Windows ve Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// MacOS'ta uygulama simgesine tıklandığında pencereyi yeniden aç
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});