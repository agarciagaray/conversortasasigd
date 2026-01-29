# Conversor de Tasas Financieras 💰

**Herramienta web profesional para convertir tasas efectivas y nominales con precisión financiera.**

---

## 📋 Descripción

El **Conversor de Tasas Financieras** es una aplicación web moderna que permite convertir tasas de interés entre dos tipos principales:

- **Tasa Efectiva** a **Tasa Nominal**
- **Tasa Nominal** a **Tasa Efectiva**

Con soporte para múltiples períodos de capitalización (Anual, Semestral, Trimestral, Bimestral, Mensual, Quincenal y Diario).

### Características Principales

✅ **Conversiones precisas** - Resultados con hasta 5 decimales  
✅ **Fórmulas matemáticas** - Muestra las fórmulas utilizadas en cada conversión  
✅ **Copiar fórmulas** - Copia al portapapeles para usar en otros lenguajes  
✅ **Interfaz intuitiva** - Diseño responsivo y amigable  
✅ **Validación robusta** - Validación de rangos (0-100%)  
✅ **Sin dependencias externas** - HTML, CSS y JavaScript vanilla  
✅ **Compatible con todos los navegadores** - Funciona en Chrome, Firefox, Safari, Edge  

---

## 🚀 Instalación Rápida

### Opción 1: Descargar y Abrir Localmente

1. **Clona el repositorio:**
```bash
git clone https://github.com/tuusuario/conversor-tasas-financieras.git
cd conversor-tasas-financieras
```

2. **Abre el archivo HTML:**
   - Haz doble clic en `index.html`
   - O arrastra el archivo a tu navegador favorito

### Opción 2: Servir con un Servidor Local

Si necesitas un servidor local (recomendado para desarrollo):

**Con Python 3:**
```bash
python -m http.server 8000
```

**Con Node.js (http-server):**
```bash
npx http-server
```

Luego accede a `http://localhost:8000` en tu navegador.

### Opción 3: Deploy en Vercel/Netlify

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
1. Arrastra la carpeta del proyecto a [netlify.com/drop](https://app.netlify.com/drop)
2. Tu sitio estará en vivo al instante

---

## 📖 Guía de Uso

### Interfaz Principal

```
┌─────────────────────────────────────────┐
│    Conversor de Tasas Financieras      │
├─────────────────────────────────────────┤
│ Tipo de Tasa Origen: [Efectiva/Nominal]│
│ Tasa (%): [0.00000]                    │
│ Periodo Origen: [Anual]                │
│                                         │
│ Tipo de Tasa Destino: [Nominal]        │
│ Periodo Destino: [Mensual]             │
│                                         │
│ [Convertir]  [Limpiar]                 │
└─────────────────────────────────────────┘
```

### Pasos para Convertir

1. **Selecciona el tipo de tasa origen:**
   - Tasa Efectiva
   - Tasa Nominal

2. **Ingresa el valor de la tasa** (0-100%)

3. **Elige el período origen**
   - Anual, Semestral, Trimestral, Bimestral, Mensual, Quincenal, Diario

4. **El tipo destino se selecciona automáticamente** (opuesto al origen)

5. **Selecciona el período destino** (por defecto: Mensual)

6. **Haz clic en "Convertir"**

### Resultados

La aplicación mostrará:

- ✓ **Tasa Resultado** - El valor convertido con hasta 5 decimales
- ✓ **Fórmula Utilizada** - La fórmula matemática aplicada
- ✓ **Descripción** - Explicación clara de la conversión
- ✓ **Variables** - Definición de cada variable usada

---

## 🧮 Fórmulas Matemáticas

### Efectiva a Nominal

```
iN = [(1 + iE)^(1/m) - 1]
```

**Donde:**
- `iE` = Tasa Efectiva (en su período origen)
- `iN` = Tasa Nominal (resultado en período destino)
- `m` = Número de períodos en un año

**Proceso:**
1. Convertir tasa efectiva origen a tasa efectiva anual
2. Convertir tasa efectiva anual a tasa nominal periódica

### Nominal a Efectiva

```
iE = (1 + iN/m)^m - 1
```

**Donde:**
- `iN` = Tasa Nominal (en su período origen)
- `iE` = Tasa Efectiva (resultado en período destino)
- `m` = Número de períodos en un año

**Proceso:**
1. Convertir tasa nominal origen a tasa efectiva anual
2. Convertir tasa efectiva anual a tasa efectiva periódica

---

## 📊 Ejemplos de Uso

### Ejemplo 1: Tasa Efectiva Anual a Nominal Mensual

**Entrada:**
- Tipo Origen: Tasa Efectiva
- Tasa: 24.36%
- Período Origen: Anual
- Tipo Destino: Tasa Nominal
- Período Destino: Mensual

**Resultado:**
- Tasa Nominal Mensual: **1.83336%**

---

### Ejemplo 2: Tasa Nominal Mensual a Efectiva Anual

**Entrada:**
- Tipo Origen: Tasa Nominal
- Tasa: 2%
- Período Origen: Mensual
- Tipo Destino: Tasa Efectiva
- Período Destino: Anual

**Resultado:**
- Tasa Efectiva Anual: **26.82418%**

---

## 🛠️ Estructura del Proyecto

```
conversor-tasas-financieras/
├── index.html                 # Archivo principal (HTML + CSS + JS)
├── README.md                  # Este archivo
├── LICENSE                    # Licencia MIT
└── .gitignore                 # Configuración de Git
```

### Contenido de index.html

**Secciones principales:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Metadatos y estilos CSS -->
</head>
<body>
    <!-- Formulario de entrada -->
    <!-- Sección de resultados -->
    <!-- Lógica JavaScript -->
</body>
</html>
```

**Componentes JavaScript:**
- `convertRate()` - Función principal de conversión
- `displayResult()` - Muestra los resultados
- `formatNumber()` - Formatea números con decimales
- `copyFormula()` - Copia fórmula al portapapeles
- `resetForm()` - Reinicia el formulario

---

## 💻 Requisitos Técnicos

- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **JavaScript habilitado**
- **No requiere** Node.js, npm o servidores backend

---

## 🔒 Características de Seguridad

✅ No almacena datos en servidor  
✅ No utiliza localStorage  
✅ Validación de entrada en cliente  
✅ Rango de validación: 0-100%  
✅ Manejo seguro de decimales  

---

## 🎨 Personalización

### Cambiar Colores

Edita las variables CSS en `index.html`:

```css
:root {
    --color-primary: #2180a8;           /* Color principal */
    --color-primary-hover: #1a6b8a;     /* Color al pasar mouse */
    --color-success: #20a040;           /* Color de éxito */
    --color-error: #c01527;             /* Color de error */
}
```

### Cambiar Idioma

Reemplaza los textos en HTML y JavaScript. Los textos principales están en:

```javascript
const periodNames = {
    anual: 'Anual',
    semestral: 'Semestral',
    // ... etc
};
```

### Agregar Más Períodos

En la función `periodMultipliers`:

```javascript
const periodMultipliers = {
    anual: 1,
    semestral: 2,
    // Agrega aquí nuevos períodos
    semanal: 52  // ejemplo
};
```

---

## 📱 Responsividad

La aplicación es completamente responsiva:

- **Desktop:** Diseño de 2 columnas
- **Tablet:** Diseño adaptado
- **Mobile:** Diseño de 1 columna

Breakpoint: 768px

---

## 🐛 Reporte de Errores

Si encuentras un error o comportamiento inesperado:

1. Verifica que los valores ingresados sean válidos (0-100%)
2. Limpia el navegador cache (Ctrl+F5)
3. Abre una issue en GitHub con:
   - Descripción del problema
   - Pasos para reproducir
   - Navegador y versión
   - Captura de pantalla (si es posible)

---

## 💡 Mejoras Futuras

- [ ] Soporte para más tipos de tasas
- [ ] Gráficos comparativos
- [ ] Exportar resultados a PDF
- [ ] Historial de conversiones
- [ ] Modo oscuro
- [ ] Múltiples idiomas
- [ ] App móvil nativa

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Puedes:

- ✅ Usar comercialmente
- ✅ Modificar el código
- ✅ Distribuir
- ✅ Usar en privado

Con la condición de incluir la licencia y el aviso de copyright.

---

## 👨‍💼 Autor

**Alejandro García**  
**Synkra - Desarrollo de Software**

---

## 🔗 Enlaces Útiles

- 📖 [Documentación de Tasas Financieras](https://www.investopedia.com/terms/e/effectiveinterestrate.asp)
- 🌐 [GitHub Repository](https://github.com/tuusuario/conversor-tasas-financieras)
- 💬 [Contacto](mailto:contacto@synkra.com)

---

## 📞 Soporte

¿Necesitas ayuda? Contáctame:

- 📧 Email: [contacto@synkra.com](mailto:contacto@synkra.com)
- 🐙 GitHub Issues: [Crear un issue](https://github.com/tuusuario/conversor-tasas-financieras/issues)

---

## 🙏 Agradecimientos

Gracias por usar el **Conversor de Tasas Financieras**.

Si te resultó útil, considera darle una ⭐ en GitHub.

---

**Última actualización:** Enero 29, 2026  
**Versión:** 1.0.0  
**Estado:** Producción ✅

---

*Desarrollado con ❤️ por Synkra*
