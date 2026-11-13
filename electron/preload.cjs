const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('nexoraDesktop', {
  platform: process.platform,
  isElectron: true,
  appVersion: '2.0.0'
});

