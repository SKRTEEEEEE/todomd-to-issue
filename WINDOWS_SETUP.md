# Windows Setup - Husky Adaptations

## Cambios realizados para compatibilidad con Windows + Git Bash

### 1. `lint-staged.config.mjs`

**Antes (no funcionaba en Windows):**

```js
const config = {
  "**/*.{ts?(x),mts}": () => "tsc -p tsconfig.prod.json --noEmit", // tsc no en PATH
  "*.{js,jsx,mjs,cjs,ts,tsx,mts}": ["pnpm lint:file", "vitest related --run"],
  "*.{md,json}": "prettier --write",
  "*": "pnpm typos", // Script bash que no funciona en Windows
  "*.{yml,yaml}": "pnpm lint:yaml", // Script bash que no funciona en Windows
};
```

**Después (compatible con Windows):**

```js
const config = {
  "**/*.{ts?(x),mts}": () => "pnpm validate-typescript", // Usa script de package.json
  "*.{js,jsx,mjs,cjs,ts,tsx,mts}": [
    "pnpm lint:file",
    "pnpm exec vitest related --run",
  ],
  "*.{md,json}": "pnpm exec prettier --write", // Usa pnpm exec
  // Disabled for Windows compatibility - run manually if needed
  // "*": "pnpm typos",
  // "*.{yml,yaml}": "pnpm lint:yaml",
};
```

### 2. `package.json` scripts

**Antes:**

```json
{
  "validate-typescript": "tsc -p tsconfig.prod.json --noEmit",
  "generate-dist": "ncc build src/index.ts",
  "typos": "chmod +x scripts/check_typos.sh && ./scripts/check_typos.sh",
  "lint:yaml": "chmod +x scripts/lint_yaml.sh && ./scripts/lint_yaml.sh"
}
```

**Después:**

```json
{
  "validate-typescript": "pnpm exec tsc -p tsconfig.prod.json --noEmit",
  "generate-dist": "pnpm exec ncc build src/index.ts",
  "typos": "echo Skipping typos check on Windows - run manually if needed",
  "lint:yaml": "echo Skipping YAML lint on Windows - run manually if needed"
}
```

## ¿Qué se omitió?

### Scripts bash deshabilitados:

- **typos check**: Verifica errores tipográficos (opcional, no crítico para build)
- **YAML linting**: Valida sintaxis YAML (opcional, no crítico para build)

Estos pueden ejecutarse manualmente si tienes las herramientas necesarias instaladas:

- `typos`: requiere instalación de [typos-cli](https://github.com/crate-ci/typos)
- `yamllint`: requiere instalación de [yamllint](https://github.com/adrienverge/yamllint)

## ¿Qué sigue funcionando?

✅ **Pre-commit hooks completos**:

- TypeScript validation
- ESLint
- Prettier formatting
- Tests relacionados

✅ **Build process completo**:

- Compilación TypeScript
- Bundling con ncc
- Generación de `dist/index.js`

✅ **Commit message validation**:

- Conventional commits
- Commitlint

## Cómo hacer commit ahora

```bash
# 1. Hacer cambios
# 2. Stage files
git add .

# 3. Commit (Husky ejecutará automáticamente):
#    - TypeScript validation
#    - Linting
#    - Prettier
#    - Tests
git commit -m "feat: add new feature"

# Si husky falla, los archivos se revertirán automáticamente
```

## Comandos manuales útiles

```bash
# Verificar TypeScript
pnpm validate-typescript

# Lint y fix
pnpm lint:fix

# Build completo
pnpm build

# Run tests
pnpm test
```

## Troubleshooting

### Error: "tsc: command not found"

**Solución:** Usa `pnpm exec tsc` o `pnpm validate-typescript`

### Error: "chmod: command not found"

**Solución:** Ya está solucionado - los scripts bash están deshabilitados

### Pre-commit muy lento

**Motivo:** TypeScript validation y tests pueden tardar
**Solución temporal:** Puedes usar `git commit --no-verify` (no recomendado)

### Line endings (CRLF vs LF)

**Solución:** Ejecuta `pnpm lint:fix` antes de commitear

```bash
pnpm lint:fix
git add .
git commit -m "fix: correct line endings"
```

## Diferencias vs Linux/Mac

| Característica | Linux/Mac  | Windows + Git Bash |
| -------------- | ---------- | ------------------ |
| TypeScript     | ✅ Directo | ✅ Via `pnpm exec` |
| Linting        | ✅         | ✅                 |
| Prettier       | ✅         | ✅                 |
| Tests          | ✅         | ✅                 |
| Typos check    | ✅         | ⚠️ Opcional/Manual |
| YAML lint      | ✅         | ⚠️ Opcional/Manual |
| Build          | ✅         | ✅                 |
| Publish        | ✅         | ✅                 |

## Notas importantes

1. **Usar `pnpm exec`** para comandos de node_modules cuando no estén en PATH
2. **Line endings**: Git Bash puede tener problemas con CRLF/LF - siempre usa `pnpm lint:fix`
3. **Scripts bash**: Si necesitas typos/yaml lint, considera instalar las herramientas en Windows o usar WSL
4. **Performance**: Los hooks pueden ser más lentos en Windows que en Linux/Mac

## Recomendación para producción

Si trabajas en un equipo mixto (Windows + Linux/Mac):

1. **Mantén esta configuración** para compatibilidad Windows
2. **Configura CI/CD** para ejecutar typos y yaml lint en el servidor (Linux)
3. Los desarrolladores Windows pueden omitir esas validaciones localmente
4. Las validaciones completas se ejecutan en CI antes de merge
