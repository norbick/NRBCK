# Strona mapy Minecraft

Statyczna strona serwera Minecraft publikowana automatycznie przez GitHub Pages.
Każdy push do gałęzi `main` uruchamia deployment na `https://nrbck.pl/`.

## Szybkie uruchomienie mapy

1. Zainstaluj i skonfiguruj na serwerze Minecraft renderer mapy — rekomendowany jest BlueMap (mapa 3D); Pl3xMap i Dynmap również działają.
2. Wystaw jego publiczny adres HTTPS, np. `https://map.twojadomena.pl`.
3. Ustaw ten adres w `server-config.js` jako `mapUrl`, razem z nazwą i adresem serwera.
4. Zacommituj zmiany i wypchnij je do `main`. GitHub Pages zdeployuje stronę automatycznie.

Przykład:

```js
window.SERVER_MAP_CONFIG = {
  serverName: 'Nazwa serwera',
  serverAddress: 'play.twojserwer.pl',
  mapUrl: 'https://map.twojadomena.pl',
  mapLabel: 'BlueMap · mapa 3D',
  mapProvider: 'BlueMap · mapa 3D',
  mapAccess: 'Publiczna mapa',
  discordUrl: 'https://discord.gg/twoj-serwer',
};
```

## Ważne dla mapy

GitHub Pages hostuje wyłącznie tę stronę — nie renderuje świata Minecrafta ani nie uruchomi BlueMap. Mapa musi działać na hostingu serwera albo innym hostingu pod własnym adresem.

Wystaw mapę przez HTTPS (najlepiej jako `map.nrbck.pl`) za reverse proxy. Port renderera mapy powinien pozostać dostępny tylko lokalnie na hoście; nie wystawiaj bezpośrednio RCON, panelu ani portu administracyjnego.

Aby mapa mogła pokazać się wewnątrz strony, jej serwer HTTP musi zezwalać na osadzenie z `https://nrbck.pl` (CSP `frame-ancestors`). `X-Frame-Options: DENY` lub `SAMEORIGIN` zablokuje iframe. Jeśli nie chcesz osadzania, odwiedzający nadal mogą użyć przycisku „Otwórz osobno”.

`server-config.js` jest publiczny. Nie wpisuj tam sekretów ani danych logowania.

## Lokalny podgląd

Nie potrzeba instalowania zależności. Otwórz `index.html` w przeglądarce albo uruchom dowolny prosty statyczny serwer w katalogu projektu.
