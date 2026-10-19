# Prosta mapa 3D Minecraft

Strona to pełnoekranowa mapa 3D. W `server-config.js` wpisz tylko nazwę serwera i publiczny URL BlueMap:

```js
window.SERVER_MAP_CONFIG = {
  serverName: 'Nazwa serwera',
  mapUrl: 'https://map.twojadomena.pl',
};
```

Każdy push do `main` automatycznie publikuje stronę na `https://nrbck.pl/`.

GitHub Pages wyświetla mapę, ale jej nie tworzy. BlueMap musi działać osobno na serwerze Minecraft i być dostępny przez HTTPS. Nie zapisuj haseł, tokenów ani RCON w `server-config.js`.
