const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

//process.env.NODE_ENV = 'production';

let mainWindow;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 730,
        height: 570,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close', () => app.quit());

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

});



const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'New map',
                accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                click() {
                    const {dialog} = require('electron');
                    let mapPath = dialog.showOpenDialog({ properties: ['openFile'] });
                    mainWindow.webContents.send('map:new', mapPath);
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            },
        ]
    },
];

// if (process.platform !== 'darwin') {
//     mainMenuTemplate.unshift({});
// }

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();

                }

            },
            {
                role: 'reload'
            },
        ]
    });
}