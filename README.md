# Frasco de Notas Digital para Enana

Regalo web interactivo: toca el frasco, elige una categoría y descubre una nota al azar.

## Estructura

```text
Regalo keisi/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── notas.js
├── assets/
│   └── images/
│       └── jar-reference.png
├── vercel.json
└── README.md
```

## Verlo en tu PC

### Opción rápida

Abre `index.html` con doble clic.

### Opción recomendada

En PowerShell, dentro de la carpeta del proyecto:

```powershell
cd "C:\Users\USUARIO\Desktop\Regalo keisi"
python -m http.server 8080
```

Luego abre [http://localhost:8080](http://localhost:8080).

## Editar las notas

Todas las frases están en [js/notas.js](/C:/Users/USUARIO/Desktop/Regalo%20keisi/js/notas.js).

Las categorías son:

- `una-razon`
- `un-recuerdo`
- `lo-que-queria-decirte`

## Publicarlo en Vercel

Como este proyecto es estático, Vercel lo publica sin backend ni build extra.

1. Sube la carpeta a un repositorio de GitHub.
2. Entra a [Vercel](https://vercel.com/).
3. Importa el repositorio.
4. Vercel detectará el proyecto como sitio estático.
5. Pulsa `Deploy`.
6. Comparte la URL que Vercel te entregue.

No hace falta configurar comandos de build.

## Publicarlo en GitHub Pages

1. Crea un repositorio, por ejemplo `regalo-keisi`.
2. Sube todo el contenido del proyecto:

```powershell
cd "C:\Users\USUARIO\Desktop\Regalo keisi"
git add .
git commit -m "Frasco de notas para Enana"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/regalo-keisi.git
git push -u origin main
```

3. En GitHub ve a `Settings > Pages`.
4. En `Branch`, selecciona `main` y carpeta `/(root)`.
5. Comparte la URL:

```text
https://TU_USUARIO.github.io/regalo-keisi/
```

## Notas de despliegue

- `vercel.json` ya deja claro que la app es estática.
- También funciona en GitHub Pages porque no depende de rutas dinámicas ni servidor.
- Si cambias textos o estilos, vuelve a subir los cambios y el link se actualiza.
