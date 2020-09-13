const { app, BrowserWindow, Menu } = require('electron')

function createWindow () {
  // ブラウザウインドウを作成
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const topMenu = new Menu(
    Menu.setApplicationMenu(null)
  )

  // そしてこのアプリの index.html をロード
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)