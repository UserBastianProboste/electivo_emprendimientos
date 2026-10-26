/*
 * Module: StoreValidatorTest
 * Description: Deterministic unit tests for store validator preflight audits
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial test suite covering placeholder detection, broken anchors, and orphaned views.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { validateStorePages } from '../storeValidator.js';

describe('validateStorePages', () => {
  test('flags empty page with critical error', () => {
    const pages = [
      { id: 'p1', label: 'Inicio', slug: '/', widgets: [] }
    ];
    const { warnings, hasBlockingErrors } = validateStorePages(pages);
    assert.strictEqual(hasBlockingErrors, true);
    assert.ok(warnings.some((w) => w.type === 'empty_page'));
  });

  test('flags unedited placeholder text in widget titles', () => {
    const pages = [
      {
        id: 'p1',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'TITULO PRINCIPAL',
              body: 'Texto personalizado real para clientes.'
            }
          }
        ]
      }
    ];
    const { warnings } = validateStorePages(pages);
    assert.ok(warnings.some((w) => w.type === 'placeholder'));
  });

  test('flags invalid vertical anchor target out of range', () => {
    const pages = [
      {
        id: 'p1',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'Bienvenidos a la tienda',
              cta_primary: {
                text: 'Ir a Seccion',
                link: '/#99'
              }
            }
          }
        ]
      }
    ];
    const { warnings } = validateStorePages(pages);
    assert.ok(warnings.some((w) => w.type === 'broken_link' && w.id.includes('invalid-anchor')));
  });

  test('accepts valid vertical anchor within range', () => {
    const pages = [
      {
        id: 'p1',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'Bienvenidos',
              cta_primary: {
                text: 'Ver Mas',
                link: '/#2'
              }
            }
          },
          {
            id: 'w2',
            type: 'cards_grid',
            props: {
              title: 'Nuestros Productos'
            }
          }
        ]
      }
    ];
    const { warnings } = validateStorePages(pages);
    const anchorWarnings = warnings.filter((w) => w.id && w.id.includes('invalid-anchor'));
    assert.strictEqual(anchorWarnings.length, 0);
  });

  test('flags broken link pointing to non-existent page slug', () => {
    const pages = [
      {
        id: 'p1',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'Bienvenidos',
              cta_primary: {
                text: 'Ver Catalogo',
                link: '/inexistente'
              }
            }
          }
        ]
      }
    ];
    const { warnings } = validateStorePages(pages);
    assert.ok(warnings.some((w) => w.id && w.id.includes('missing-route')));
  });

  test('flags orphaned page when not linked from main menu or buttons', () => {
    const pages = [
      {
        id: 'page-home',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'Bienvenidos a la tienda'
            }
          }
        ]
      },
      {
        id: 'page-promo',
        label: 'Promociones Especiales',
        slug: '/promociones',
        widgets: [
          {
            id: 'w2',
            type: 'cards_grid',
            props: {
              title: 'Descuentos del Mes'
            }
          }
        ]
      }
    ];
    const { warnings } = validateStorePages(pages);
    assert.ok(warnings.some((w) => w.type === 'orphaned_page'));
  });

  test('validates clean store when all links and pages are correctly referenced', () => {
    const pages = [
      {
        id: 'page-home',
        label: 'Inicio',
        slug: '/',
        widgets: [
          {
            id: 'w1',
            type: 'hero_banner',
            props: {
              title: 'Emprendimiento Sustentable',
              subtitle: 'Soluciones ecologicas',
              body: 'Conoce nuestra variedad de productos organicos hechos a mano.',
              cta_primary: {
                text: 'Ver Catalogo',
                link: '/catalogo'
              },
              cta_secondary: {
                text: 'Contactar',
                link: '/#2'
              }
            }
          },
          {
            id: 'w2',
            type: 'cards_grid',
            props: {
              title: 'Lineas de Produccion',
              subtitle: 'Hechas con materia prima local'
            }
          }
        ]
      },
      {
        id: 'page-cat',
        label: 'Catalogo',
        slug: '/catalogo',
        widgets: [
          {
            id: 'w3',
            type: 'catalog_grid',
            props: {
              title: 'Inventario Activo'
            }
          }
        ]
      }
    ];
    const { warnings, hasBlockingErrors } = validateStorePages(pages);
    assert.strictEqual(hasBlockingErrors, false);
    assert.strictEqual(warnings.length, 0);
  });
});
