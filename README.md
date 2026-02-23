# Weekly Menu (iPad kitchen display)

Statisk HTML/CSS/JS-sida för veckomeny med 4-veckorsrotation (byts automatiskt varje söndag).

## Lokal körning med Docker

```bash
docker build -t weekly-menu-ipad .
docker run --rm -p 8080:80 weekly-menu-ipad
```

Öppna: `http://localhost:8080`

## GitHub Actions -> GHCR

Workflow finns i `.github/workflows/docker-publish.yml`.

Vid push till `main` byggs och pushas image till:

- `ghcr.io/<owner>/weekly-menu-ipad:latest`
- `ghcr.io/<owner>/weekly-menu-ipad:sha-...`

### Krav

- Repo på GitHub
- GitHub Packages aktiverat för kontot/org
- Workflow permissions tillåter `packages: write` (redan satt i workflow)

## iPad mini i kök (tips)

- Öppna sidan i Safari och välj **Add to Home Screen / Lägg till på hemskärmen**.
- Starta sidan från hemskärmsikonen för att köra i web-app-läge (utan Safari UI/url-bar).
- Lås skärmen i Guided Access om den ska stå permanent.
- Om du hostar på LAN: använd fast lokal URL, t.ex. `http://menu.local`.
