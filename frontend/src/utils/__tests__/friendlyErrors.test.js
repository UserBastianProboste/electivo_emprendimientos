/*
 * Module: FriendlyErrorsTest
 * Description: Deterministic unit tests for friendly error sanitizer and translation
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial test suite covering network, cors, websocket, and quota errors.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatFriendlyError } from '../friendlyErrors.js';

describe('formatFriendlyError', () => {
  test('translates CORS and network errors gracefully', () => {
    const error = new Error('TypeError: Failed to fetch due to CORS preflight failure');
    const result = formatFriendlyError(error);
    assert.strictEqual(result.title, 'Problema de Conexion con el Servidor');
    assert.ok(result.suggestion.includes('Tus cambios continuan guardados'));
  });

  test('translates WebSocket connection failures', () => {
    const error = 'WebSocket connection to ws://localhost:8000 failed';
    const result = formatFriendlyError(error);
    assert.strictEqual(result.title, 'Conexion en Tiempo Real Interrumpida');
    assert.ok(result.suggestion.includes('memoria local'));
  });

  test('translates LocalStorage quota exceeded errors', () => {
    const error = new Error('QuotaExceededError: The quota has been exceeded.');
    const result = formatFriendlyError(error);
    assert.strictEqual(result.title, 'Memoria Local Llena');
    assert.ok(result.suggestion.includes('exportar'));
  });

  test('translates JSON parsing syntax errors', () => {
    const error = new SyntaxError('Unexpected token < in JSON at position 0');
    const result = formatFriendlyError(error);
    assert.strictEqual(result.title, 'Formato de Datos Inesperado');
    assert.ok(result.suggestion.includes('valores predeterminados'));
  });

  test('provides robust fallback for unknown errors', () => {
    const result = formatFriendlyError(null);
    assert.strictEqual(result.title, 'Aviso de Funcionamiento');
    assert.ok(result.suggestion.length > 0);
  });
});
