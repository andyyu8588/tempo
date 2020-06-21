const { app, BrowserWindow, ipcMain, Menu, shell, Tray, application } = require('electron')
const AutoLaunch = require('auto-launch')
const fs = require('fs')

var window = null

var tray = null
var trayMenu = Menu.buildFromTemplate([
  {
    label: 'about',
    click() {
      shell.openExternal('https://defhacks.co/hackathons/virtual.html')
    }
  },{
    label: 'exit',
    click() {
      app.isQuitting = true
      app.quit()
      tray.destroy
    }
  }, {
    label: 'console',
    click() {
      window.webContents.openDevTools()
    }
  }
])

var startup = new AutoLaunch({
  name: 'Tempo',
})

function createWindow() {
  // Create the browser window.
  return new Promise((resolve, reject) => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      title: "asdasd",
      webPreferences: {
        nodeIntegration: true
      }
    })
    window = win

    // and load the index.html of the app.
    win.loadFile('./dist/app/index.html')

    // Open the DevTools.
    // win.webContents.openDevTools()
    
    resolve(win)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  .then(win => {
    win.setMenu(null)
    win.on('close', (e) => {
      if (!app.isQuitting) {
        e.preventDefault()
        win.hide()
      }
    })
    tray = new Tray('./logo.png')
    tray.setToolTip('hi')
    tray.setContextMenu(trayMenu)
    tray.on('double-click', () => {
      console.log('oi')
      win.show()
    })
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    tray.destroy()
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('quit', () => {
  if (app.isQuitting) {
    tray.destroy()
  }
})

ipcMain.on('toggleStartup', (event, arg) => {
  startup.isEnabled()
  .then(state => {
    console.log(state)
    if (state) {
      startup.disable()
      .then(res => {
        event.returnValue = false
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      startup.enable()
      .then(res => {
        event.returnValue = true
      })
      .catch(err => {
        console.log(err)
      })
    }
  })
  .catch(err => {
    console.log(err)
  })
})