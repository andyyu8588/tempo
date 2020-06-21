const { app, BrowserWindow, ipcMain, Menu, shell, Tray, powerMonitor } = require('electron')
const AutoLaunch = require('auto-launch')
const fs = require('fs')
const path = require('path')

var userPath = path.join(app.getPath('userData'), 'data.json')

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
      title: "Tempo",
      webPreferences: {
        nodeIntegration: true
      }
    })
    window = win

    // and load the index.html of the app.
    win.loadFile('./dist/app/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

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

ipcMain.on('set', (event, arg) => {
  console.log(arg)
  fs.writeFileSync(userPath, JSON.stringify(arg))
  event.returnValue = 'set ok'
})

ipcMain.on('get', (event, arg) => {
  console.log(arg)
  data = fs.readFileSync(userPath)
  event.returnValue = data
})

ipcMain.on('startup', (event, arg) => {
  startup.isEnabled()
  .then(state => {
    event.returnValue = state
  })
  .catch(err => {
    console.log(err)
    event.returnValue = err
  })
})

ipcMain.on('toggleStartup', (event, arg) => {
  startup.isEnabled()
  .then(state => {
    if (state) {
      startup.disable()
      .then(() => {
        event.returnValue = ''
      })
      .catch(err => {
        event.returnValue = err
      })
    } else {
      startup.enable()
      .then(() => {
        event.returnValue = ''
      })
      .catch(err => {
        event.returnValue = err
      })
    }
  })
  .catch(err => {
    console.log(err)
    event.returnValue = err
  })
})

ipcMain.on('state', (event, arg) => {
  if (arg == true) {
    event.returnValue = {
      state: powerMonitor.getSystemIdleState(36000),
      time: powerMonitor.getSystemIdleTime()
    }
  } else {
    event.returnValue = {
      time: powerMonitor.getSystemIdleTime()
    }
  }
})
