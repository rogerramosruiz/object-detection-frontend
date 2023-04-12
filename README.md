# Object detection frontend

## Stack 

<img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg" height="60"> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" height="60">


## Clone repo
```bash
git clone https://github.com/rogerramosruiz/object-detection-frontend.git
cd object-detection-frontend
```

## Set up
### Install dependencies

```bash
npm install 
```

Create a .env file, set VITE_API variable with the backend endpoint and VITE_WS with the backned websocket endpont

e.g

```
VITE_API=http://localhost:8080
VITE_WS=ws://localhost:8080
```

### Run

```bash
npm run dev 
```

### Build
```bash
npm run build
```
