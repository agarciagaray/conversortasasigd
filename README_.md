# Conversor de Tasas Financieras

> Herramienta simple en HTML/JavaScript para convertir entre tasas efectivas y nominales en distintos periodos.

**Estado:** Proyecto de una sola página (frontend). Archivo principal: [ConversorTasas.html](ConversorTasas.html)

**Descripción**

- **Propósito:** Convertir tasas financieras entre formatos _efectiva_ y _nominal_ para distintos periodos (anual, semestral, trimestral, bimestral, mensual, quincenal, diario).
- **Tecnologías:** HTML, CSS y JavaScript puro (sin dependencias externas).

**Cómo funciona (resumen técnico)**

- El convertidor trabaja con tasas en porcentaje; el usuario ingresa una tasa (por ejemplo `12` para 12%) y selecciona el tipo y periodo origen y destino.
- Internamente las tasas se convierten a formato decimal para cálculos (p. ej. `12%` → `0.12`) y se aplican fórmulas estándar de equivalencia entre tasas.

**Fórmulas usadas**

- De Tasa Nominal (iN) a Tasa Efectiva (iE):

$$i_E = \left(1 + \frac{i_N}{m}\right)^m - 1$$

donde $m$ es el número de periodos por año del tipo nominal.

- De Tasa Efectiva a tasa periódica en el periodo destino (usada para obtener la tasa equivalente en el periodo seleccionado):

$$i_{periodo} = \left(1 + i_E\right)^{1/m} - 1$$

Estas fórmulas permiten pasar por una tasa efectiva anual intermedia cuando el tipo y/o periodos difieren.

**Características**

- Interfaz responsive y accesible desde cualquier navegador moderno.
- Validaciones de entrada (rango 0–100%).
- Muestra la fórmula utilizada y permite copiarla al portapapeles.
- Mensajes de éxito y error para guiar al usuario.

**Uso**

1. Abrir el archivo `ConversorTasas.html` en un navegador (doble clic o arrastrar al navegador).
2. Ingresar la tasa en porcentaje en `Tasa (%)`.
3. Seleccionar el `Tipo de Tasa Origen` (Efectiva o Nominal) y su `Periodo Origen`.
4. Seleccionar el `Tipo de Tasa Destino` y su `Periodo Destino`.
5. Hacer clic en **Convertir**.
6. El resultado aparece en la sección de resultados; la fórmula aplicada y las variables se muestran debajo.

**Ejemplo**

- Convertir 12% (Efectiva anual) a tasa periódica mensual:

Usando $$i_{periodo} = (1 + 0.12)^{1/12} - 1 \approx 0.009489\ (=0.9489\%\ mensual)$$

**Despliegue**

- Método rápido (local): abrir `ConversorTasas.html` en el navegador.
- Publicar en GitHub Pages: subir el repositorio con el archivo en la rama `main` y activar Pages en la configuración del repositorio.

**Comandos útiles para subir al repositorio (si aún no está inicializado)**

```bash
git init
git add ConversorTasas.html README.md
git commit -m "Agregar Conversor de Tasas y README"
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

**Contribuciones**

- Pull requests bienvenidos. Mantén cambios atómicos y añade descripciones claras.

**Licencia**

- MIT — úsalo y adáptalo libremente, se agradece atribución.

**Contacto**

- Si deseas, añade tu nombre o correo en el repositorio para que otros puedan contactarte.
- Pull requests bienvenidos. Mantén cambios atómicos y añade descripciones claras.

**Licencia**

- MIT — úsalo y adáptalo libremente, se agradece atribución.

**Contacto**

- Si deseas, añade tu nombre o correo en el repositorio para que otros puedan contactarte.
