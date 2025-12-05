const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('ikiraApp', {
  version: '1.0',
});
