# Tågväxeln – app för Android

Mappen är en installerbar webbapp (PWA). När den är installerad på telefonen har den egen ikon på hemskärmen, startar i helskärm utan adressfält och går att spela offline.

## Filer
- `index.html` – hela spelet
- `manifest.webmanifest` – appens namn, ikon, helskärm och stående läge
- `sw.js` – gör att appen fungerar offline
- `icons/` – appikoner

## 1. Lägg upp mappen på en webbadress med https
Telefonen kan bara installera appen från en https-adress. Två gratis sätt:

**Netlify Drop (enklast):** gå till https://app.netlify.com/drop och dra hela mappen `tagvaxeln-app` till sidan. Du får en adress som `https://namn.netlify.app`.

**GitHub Pages:** lägg filerna i ett GitHub-repo och slå på Pages under Settings → Pages. Adressen blir `https://<användarnamn>.github.io/<repo>/`.

## 2. Installera på Android
1. Öppna adressen i Chrome på telefonen.
2. Tryck på ⬇-knappen uppe till höger i spelet, eller på Chromes meny ⋮ → **Installera app**.
3. Tågväxeln hamnar bland dina appar och på hemskärmen.

## Uppdatera appen
Ändra filerna, höj versionen i `sw.js` (`tagvaxeln-v1` → `tagvaxeln-v2`) och ladda upp igen. Telefonen hämtar den nya versionen nästa gång appen startar med internet, och visar den vid starten efter det.
