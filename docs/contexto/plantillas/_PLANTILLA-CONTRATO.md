# CONTRATO — Bloque <N> (<nombre>)

Interface de entrada/salida del bloque. **Manda este contrato**; el esquema de Supabase lo cumple; un test comprueba que coinciden. Todo cambio lo aprueban los dos socios y se anota en `CHANGELOG.md`.

## Consume (entrada)
| Qué | Fuente (bloque/tabla) | Forma |
|-----|-----------------------|-------|
| <dato> | <bloque origen / tabla.columna> | <tipo / forma JSON> |

Precondición: <qué tiene que ser cierto para poder entrar>.

## Produce (salida)
| Qué | Destino (bloque/tabla) | Forma |
|-----|------------------------|-------|
| <resultado> | <bloque destino / tabla> | <tipo / forma JSON> |

## Error
<qué pasa si falla: qué se registra y dónde>.

## Fuente de verdad en Supabase
Migraciones: <archivos>. Test de coincidencia: <ruta del test que comprueba que los campos existen>.
