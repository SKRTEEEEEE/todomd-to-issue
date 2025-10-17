# Documentación de Reglas ESLint Activas

Este documento describe todas las reglas de ESLint configuradas en el proyecto `todomd-to-issue`, explicando qué hace cada una y por qué está activada.

---

## 📋 Índice

1. [Configuración Base](#configuración-base)
2. [Plugins Instalados](#plugins-instalados)
3. [Extends (Presets)](#extends-presets)
4. [Reglas Personalizadas](#reglas-personalizadas)
5. [Overrides (Excepciones por Tipo de Archivo)](#overrides-excepciones-por-tipo-de-archivo)

---

## Configuración Base

### Parser y Parser Options

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module",
    "ecmaVersion": 2022
  }
}
```

- **`@typescript-eslint/parser`**: Parser que permite a ESLint entender código TypeScript.
- **`project: "tsconfig.json"`**: Habilita reglas que requieren información de tipos (type-aware linting).
- **`sourceType: "module"`**: Indica que el código usa módulos ES6 (import/export).
- **`ecmaVersion: 2022`**: Permite usar características de JavaScript ES2022.

---

## Plugins Instalados

```json
"plugins": ["@typescript-eslint", "simple-import-sort"]
```

### 1. `@typescript-eslint`

Plugin oficial de TypeScript para ESLint que proporciona reglas específicas para TypeScript, incluyendo:

- Verificación de tipos
- Convenciones de código TypeScript
- Detección de patrones inseguros con tipos

### 2. `simple-import-sort`

Plugin que automatiza el ordenamiento de imports y exports según reglas configurables.

---

## Extends (Presets)

Los presets son conjuntos de reglas pre-configuradas que se aplican al proyecto:

```json
"extends": [
  "eslint:recommended",
  "plugin:@typescript-eslint/strict-type-checked",
  "plugin:@typescript-eslint/stylistic-type-checked",
  "plugin:prettier/recommended",
  "plugin:unicorn/recommended",
  "plugin:node/recommended"
]
```

### 1. `eslint:recommended`

**Reglas base de ESLint** que detectan errores comunes de JavaScript:

- Variables no definidas
- Variables declaradas pero no usadas
- Asignaciones en condicionales
- Código inalcanzable
- Y más...

**Por qué está activo:** Base fundamental para cualquier proyecto JavaScript/TypeScript.

---

### 2. `plugin:@typescript-eslint/strict-type-checked`

**Reglas estrictas de TypeScript con verificación de tipos.**

#### Principales reglas incluidas:

- **`@typescript-eslint/no-explicit-any`**: Prohíbe el uso del tipo `any`.
  - **Por qué:** `any` elimina todas las ventajas del tipado estático de TypeScript.

- **`@typescript-eslint/no-unused-vars`**: Detecta variables declaradas pero no usadas.
  - **Por qué:** Variables no usadas indican código muerto o errores de refactorización.

- **`@typescript-eslint/no-floating-promises`**: Requiere que las Promises sean manejadas correctamente (await o .catch()).
  - **Por qué:** Promises no manejadas pueden causar errores silenciosos.

- **`@typescript-eslint/no-misused-promises`**: Previene uso incorrecto de Promises (ej: en condicionales).
  - **Por qué:** Usar Promises en contextos síncronos causa bugs sutiles.

- **`@typescript-eslint/await-thenable`**: Solo permite `await` en valores que realmente son Promises.
  - **Por qué:** `await` en valores no-Promise es innecesario y puede indicar un error.

- **`@typescript-eslint/no-unnecessary-type-assertion`**: Detecta aserciones de tipo redundantes.
  - **Por qué:** Aserciones innecesarias ensucian el código.

- **`@typescript-eslint/prefer-nullish-coalescing`**: Prefiere `??` sobre `||` cuando sea apropiado.
  - **Por qué:** `??` solo considera `null`/`undefined`, mientras `||` también considera `0`, `''`, `false`.

- **`@typescript-eslint/prefer-optional-chain`**: Prefiere optional chaining (`?.`) sobre comprobaciones manuales.
  - **Por qué:** Código más limpio y menos propenso a errores.

**Por qué está activo:** Garantiza el máximo aprovechamiento del sistema de tipos de TypeScript y previene errores comunes.

---

### 3. `plugin:@typescript-eslint/stylistic-type-checked`

**Reglas estilísticas de TypeScript con verificación de tipos.**

#### Principales reglas incluidas:

- **`@typescript-eslint/array-type`**: Prefiere `T[]` sobre `Array<T>` (configurable).
  - **Por qué:** Consistencia en la declaración de tipos de arrays.

- **`@typescript-eslint/consistent-type-definitions`**: Prefiere `interface` o `type` consistentemente.
  - **Por qué:** Consistencia en la definición de tipos.

- **`@typescript-eslint/prefer-function-type`**: Prefiere sintaxis de función para tipos con solo una firma de llamada.
  - **Por qué:** Sintaxis más concisa y legible.

- **`@typescript-eslint/prefer-for-of`**: Prefiere `for-of` sobre `for` tradicional cuando sea posible.
  - **Por qué:** Código más moderno y legible.

**Por qué está activo:** Mantiene un estilo consistente en todo el código TypeScript.

---

### 4. `plugin:prettier/recommended`

**Integración de Prettier con ESLint.**

Este preset hace tres cosas:

1. Activa `eslint-plugin-prettier`: Ejecuta Prettier como regla de ESLint.
2. Activa `eslint-config-prettier`: Desactiva reglas de formato de ESLint que conflictúan con Prettier.
3. Reporta diferencias de formato como errores de ESLint.

**Por qué está activo:**

- Automatiza el formato del código.
- Elimina debates sobre estilo de código.
- Garantiza código consistentemente formateado.

---

### 5. `plugin:unicorn/recommended`

**Reglas para mejorar la calidad del código y usar características modernas de JavaScript.**

#### Principales reglas incluidas:

- **`unicorn/prefer-module`**: Prefiere ES Modules sobre CommonJS.
  - **Por qué:** ES Modules es el estándar moderno.
  - **Estado:** ⚠️ Desactivada (`off`) en este proyecto.

- **`unicorn/prefer-top-level-await`**: Prefiere top-level await cuando sea posible.
  - **Por qué:** Simplifica código asíncrono.
  - **Estado:** ⚠️ Desactivada (`off`) en este proyecto.

- **`unicorn/prevent-abbreviations`**: Prohíbe abreviaciones en nombres de variables.
  - **Por qué:** Nombres descriptivos mejoran la legibilidad.
  - **Estado:** ⚠️ Desactivada (`off`) en este proyecto para permitir abreviaciones comunes.

- **`unicorn/prefer-node-protocol`**: Requiere `node:` prefix para imports de Node.js.
  - **Por qué:** Claridad sobre qué imports son de Node.js vs externos.
  - **Estado:** ✅ Activa.

- **`unicorn/prefer-string-replace-all`**: Prefiere `replaceAll()` sobre `replace()` con regex global.
  - **Por qué:** Más explícito y legible.
  - **Estado:** ✅ Activa.

- **`unicorn/prefer-set-has`**: Prefiere `Set.has()` sobre `Array.includes()` para verificación de pertenencia.
  - **Por qué:** `Set.has()` es O(1), `Array.includes()` es O(n).
  - **Estado:** ✅ Activa.

- **`unicorn/no-array-for-each`**: Prefiere `for-of` sobre `Array.forEach()`.
  - **Por qué:** `for-of` es más rápido y permite `break`/`continue`/`return`.
  - **Estado:** ✅ Activa.

- **`unicorn/no-null`**: Prefiere `undefined` sobre `null`.
  - **Por qué:** JavaScript tiene dos valores "vacíos", consolidar en uno simplifica.
  - **Estado:** ✅ Activa (pero flexible con el código existente).

**Por qué está activo:** Promueve código moderno, eficiente y con mejores prácticas.

---

### 6. `plugin:node/recommended`

**Reglas específicas para desarrollo en Node.js.**

#### Principales reglas incluidas:

- **`node/no-missing-import`**: Detecta imports de módulos que no existen.
  - **Por qué:** Previene errores en runtime.
  - **Estado:** ⚠️ Desactivada (`off`) porque TypeScript ya hace esta verificación.

- **`node/no-unsupported-features/es-syntax`**: Detecta características de ES que no están soportadas en la versión de Node.js configurada.
  - **Por qué:** Previene errores en runtime por features no soportadas.
  - **Estado:** ✅ Activa, pero con excepción para ES Modules.

- **`node/no-unpublished-import`**: Detecta imports de devDependencies en código de producción.
  - **Por qué:** DevDependencies no se instalan en producción.
  - **Estado:** ⚠️ Desactivada (`off`) porque GitHub Actions incluye todas las dependencias.

- **`node/no-extraneous-import`**: Detecta imports de packages no declarados en package.json.
  - **Por qué:** Previene errores de dependencias faltantes.
  - **Estado:** ✅ Activa.

**Por qué está activo:** Garantiza compatibilidad con Node.js y buenas prácticas en proyectos Node.

---

## Reglas Personalizadas

Reglas modificadas o añadidas específicamente para este proyecto:

```json
"rules": {
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
  "unicorn/prefer-module": "off",
  "unicorn/prefer-top-level-await": "off",
  "unicorn/prevent-abbreviations": "off",
  "no-console": "warn",
  "node/no-missing-import": "off",
  "node/no-unsupported-features/es-syntax": ["error", { "ignores": ["modules"] }],
  "node/no-unpublished-import": "off",
  "no-process-exit": "off",
  "@typescript-eslint/restrict-template-expressions": ["error", { "allowNumber": true }],
  "@typescript-eslint/no-unsafe-assignment": "off",
  "@typescript-eslint/no-unsafe-call": "off",
  "@typescript-eslint/no-unsafe-member-access": "off",
  "@typescript-eslint/no-unsafe-return": "off"
}
```

### 1. `simple-import-sort/imports` y `simple-import-sort/exports`

**Nivel: `error`**

Ordena automáticamente los imports y exports según grupos configurados.

**Orden de imports en archivos `.ts`:**

1. Módulos nativos de Node.js (`fs`, `path`, etc.)
2. Imports de tipo (side-effect imports con `\u0000`)
3. Prefijo `node:` explícito
4. Dependencias externas (`@actions/github`, `js-yaml`, etc.)
5. Imports de tests (`@/tests`)
6. Imports internos del proyecto (`@/src`)
7. Imports relativos (`../`, `./`)

**Por qué está activo:**

- Mantiene imports consistentes en todo el proyecto.
- Facilita encontrar imports específicos.
- Reduce merge conflicts en imports.
- Auto-fix disponible.

---

### 2. `unicorn/prefer-module`

**Nivel: `off`**

**Por qué está desactivada:** El proyecto ya usa ES Modules, y algunos archivos de configuración (como `vitest.config.ts`) pueden necesitar CommonJS.

---

### 3. `unicorn/prefer-top-level-await`

**Nivel: `off`**

**Por qué está desactivada:** Top-level await no es compatible en todos los contextos de Node.js, y el proyecto no lo necesita.

---

### 4. `unicorn/prevent-abbreviations`

**Nivel: `off`**

**Por qué está desactivada:** Permite abreviaciones comunes y aceptadas como:

- `props` en lugar de `properties`
- `params` en lugar de `parameters`
- `err` en lugar de `error`
- `req`/`res` en Express
- `ctx` en contextos

Esto mejora la legibilidad sin ser demasiado verboso.

---

### 5. `no-console`

**Nivel: `warn`**

Advierte sobre el uso de `console.log()`, `console.error()`, etc.

**Por qué está en `warn` y no `error`:**

- En GitHub Actions, el logging es necesario.
- Los warnings no bloquean el build.
- Recuerda al desarrollador usar el logger apropiado cuando esté disponible.

**Cuándo usar console:**

- En scripts de desarrollo.
- En archivos de configuración.
- Cuando el logger no esté disponible.

**Cuándo NO usarlo:**

- En código de producción con sistema de logging disponible.
- En bibliotecas (deben ser silenciosas por defecto).

---

### 6. `node/no-missing-import`

**Nivel: `off`**

**Por qué está desactivada:** TypeScript (`tsc`) ya verifica que todos los imports existan. Esta regla puede dar falsos positivos con configuraciones de TypeScript avanzadas.

---

### 7. `node/no-unsupported-features/es-syntax`

**Nivel: `error` con excepción para `modules`**

Detecta características de ES que no están soportadas en la versión de Node.js configurada, **excepto** ES Modules.

**Por qué la excepción:**

- El proyecto usa ES Modules (`type: "module"` en package.json).
- Node.js 18+ tiene soporte completo para ES Modules.

---

### 8. `node/no-unpublished-import`

**Nivel: `off`**

**Por qué está desactivada:**

- En GitHub Actions, todas las dependencias (incluyendo devDependencies) están disponibles.
- El proyecto no se publica como librería npm, es una GitHub Action.

---

### 9. `no-process-exit`

**Nivel: `off`**

**Por qué está desactivada:**

- En GitHub Actions, `process.exit()` puede ser necesario para terminar el workflow con un código de salida específico.
- El proyecto maneja errores apropiadamente con try/catch.

---

### 10. `@typescript-eslint/restrict-template-expressions`

**Nivel: `error` con `allowNumber: true`**

Restringe qué tipos pueden ser interpolados en template strings, pero **permite números**.

**Comportamiento:**

```typescript
// ✅ Permitido
const msg = `Count: ${42}`;
const msg = `Name: ${"Alice"}`;

// ❌ No permitido (sin allowNumber: true)
const msg = `Value: ${someNumber}`; // number

// ❌ No permitido
const msg = `Object: ${obj}`; // object
const msg = `Array: ${arr}`; // array
```

**Por qué está activo:**

- Previene conversiones implícitas problemáticas (ej: `[object Object]`).
- Permite números porque su conversión a string es predecible y segura.

---

### 11. Reglas `@typescript-eslint/no-unsafe-*`

**Nivel: `off`**

```json
"@typescript-eslint/no-unsafe-assignment": "off",
"@typescript-eslint/no-unsafe-call": "off",
"@typescript-eslint/no-unsafe-member-access": "off",
"@typescript-eslint/no-unsafe-return": "off"
```

Estas reglas detectan operaciones "inseguras" con tipos `any` o `unknown`.

**Por qué están desactivadas:**

- Librerías externas como `js-yaml` retornan `any` por diseño (contenido dinámico).
- El proyecto valida en runtime los datos parseados de YAML.
- TypeScript strict mode ya proporciona suficiente seguridad de tipos.
- Desactivarlas evita necesitar `eslint-disable` comments por todo el código.

**Alternativa implementada:**
En lugar de estas reglas, el proyecto usa:

- Type guards con `Array.isArray()`, `typeof`, etc.
- Interfaces explícitas para datos parseados.
- Validación en runtime de estructuras dinámicas.

---

## Overrides (Excepciones por Tipo de Archivo)

ESLint permite configurar reglas diferentes según patrones de archivos.

### Override 1: Archivos TypeScript (`*.ts`)

```json
{
  "files": ["*.ts"],
  "rules": {
    "simple-import-sort/imports": [
      "error",
      { "groups": [...] }
    ]
  }
}
```

**Configuración especial de ordenamiento de imports** para archivos TypeScript, con grupos más detallados que incluyen separación de imports nativos de Node.js, externos e internos.

---

### Override 2: Archivos JavaScript (`*.js`, `*.mjs`, `*.cjs`)

```json
{
  "files": ["*.js", "*.mjs", "*.cjs"],
  "extends": ["plugin:@typescript-eslint/disable-type-checked"]
}
```

**Desactiva todas las reglas que requieren información de tipos** en archivos JavaScript, porque:

- Los archivos JS no tienen type checking.
- Evita errores de ESLint en archivos de configuración.
- Permite configuración en JS puro sin TypeScript.

---

### Override 3: Tests (`tests/**`)

```json
{
  "files": ["tests/**"],
  "plugins": ["vitest"],
  "extends": ["plugin:vitest/recommended"],
  "rules": {
    "@typescript-eslint/unbound-method": "off",
    "vitest/expect-expect": "off",
    "vitest/no-standalone-expect": "off"
  }
}
```

**Configuración específica para archivos de test:**

#### Plugin Vitest

Añade reglas específicas para tests con Vitest:

- `vitest/valid-expect`: Valida uso correcto de assertions.
- `vitest/no-disabled-tests`: Detecta tests desactivados (`test.skip`).
- `vitest/no-focused-tests`: Detecta tests con `.only` que no deberían subirse.
- `vitest/prefer-to-be`: Prefiere `.toBe()` sobre `.toEqual()` para valores primitivos.

#### Reglas desactivadas en tests:

1. **`@typescript-eslint/unbound-method`: `off`**
   - **Por qué:** En tests con mocks, es común pasar métodos sin `bind`.
2. **`vitest/expect-expect`: `off`**
   - **Por qué:** Algunos tests usan helpers personalizados para assertions.

3. **`vitest/no-standalone-expect`: `off`**
   - **Por qué:** Permite `expect()` fuera de bloques `test()` en funciones helper.

---

## 🎯 Resumen: Filosofía de las Reglas

### Objetivos del Linting en este Proyecto:

1. **Seguridad de Tipos**: Máximo aprovechamiento de TypeScript.
2. **Calidad de Código**: Detectar bugs antes del runtime.
3. **Consistencia**: Estilo uniforme en todo el código.
4. **Modernidad**: Usar características actuales de JavaScript/TypeScript.
5. **Performance**: Preferir patrones eficientes (Set vs Array, etc.).
6. **Mantenibilidad**: Código legible y auto-documentado.

### Balance Pragmático:

- **Reglas estrictas** donde previenen bugs reales.
- **Reglas desactivadas** cuando:
  - TypeScript ya hace la verificación.
  - El contexto (GitHub Actions) lo requiere.
  - El costo/beneficio no justifica la rigidez.

---

## 🔧 Comandos Útiles

```bash
# Ver todos los errores de lint
pnpm lint

# Auto-corregir lo que sea posible
pnpm lint:fix

# Lint un archivo específico
pnpm lint:file src/action.ts

# Ver solo warnings
pnpm lint -- --quiet
```

---

## 📚 Referencias

- [ESLint Docs](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Unicorn Plugin](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [Prettier Integration](https://prettier.io/docs/en/integrating-with-linters.html)
- [Node Plugin](https://github.com/mysticatea/eslint-plugin-node)

---

## 💡 Recomendaciones

1. **Usar auto-fix frecuentemente**: Muchas reglas tienen corrección automática.
2. **Entender los warnings**: Si ves un warning, entiende el por qué antes de desactivarlo.

3. **No desactivar reglas sin justificación**: Cada regla tiene un propósito de calidad o seguridad.

4. **Revisar el linter antes de commits**: El pre-commit hook debería correr `pnpm lint:fix`.

5. **Mantener ESLint actualizado**: Nuevas versiones traen mejores reglas y correcciones de bugs.
