/*
 * Module: MediaContentInspector
 * Description: Inspector configuration panel for Video Player and Blog/Content Grid widgets (Widgets 16 and 17)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial modular implementation of video and blog content inspectors.
 */

import React from 'react';
import { Plus, Trash2, Video, Image, Play, FileText } from 'lucide-react';

export function VideoPlayerInspector({ currentProps = {}, onFieldChange }) {
  const source = currentProps.source || '';
  const thumbnail = currentProps.thumbnail || '';
  const caption = currentProps.caption || '';
  const aspectRatio = currentProps.aspect_ratio || '16:9';

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
        Configuracion de Video (YouTube, Vimeo o MP4)
      </h4>

      {/* Video Source URL */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          URL del Video (YouTube, Vimeo o enlace directo .mp4)
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=... o https://...video.mp4"
            value={source}
            onChange={(e) => onFieldChange('source', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.65rem 0.5rem 2rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.825rem',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-mono)',
            }}
          />
          <Video
            size={14}
            color="var(--md-sys-color-primary)"
            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '0.2rem', display: 'block' }}>
          Admite enlaces directos de YouTube, Vimeo y archivos de video MP4/WebM.
        </span>
      </div>

      {/* Poster Thumbnail Image */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          Imagen de Portada / Poster
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="URL de imagen de portada (Unsplash o servidor)"
            value={thumbnail}
            onChange={(e) => onFieldChange('thumbnail', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.65rem 0.5rem 2rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.825rem',
              boxSizing: 'border-box',
            }}
          />
          <Image
            size={14}
            color="var(--md-sys-color-primary)"
            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}
          />
        </div>
      </div>

      {/* Aspect Ratio Selector */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          Proporcion de Pantalla
        </label>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['16:9', '4:3', '1:1', '21:9'].map((ratio) => {
            const isSelected = aspectRatio === ratio;
            return (
              <button
                key={ratio}
                type="button"
                onClick={() => onFieldChange('aspect_ratio', ratio)}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: isSelected ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: isSelected ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container)',
                  color: isSelected ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                  fontSize: '0.75rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {ratio}
              </button>
            );
          })}
        </div>
      </div>

      {/* Caption Text */}
      <div>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.35rem' }}>
          Pie de Video / Descripcion
        </label>
        <textarea
          rows={2}
          value={caption}
          onChange={(e) => onFieldChange('caption', e.target.value)}
          placeholder="Escribe una breve explicacion del contenido..."
          style={{
            width: '100%',
            padding: '0.5rem 0.65rem',
            borderRadius: 'var(--md-shape-sm)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            backgroundColor: 'var(--md-sys-color-surface)',
            color: 'var(--md-sys-color-on-surface)',
            fontSize: '0.825rem',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
      </div>
    </div>
  );
}

export function BlogGridInspector({ currentProps = {}, onFieldChange, LinkInput }) {
  const posts = currentProps.posts || [];
  const cta = currentProps.cta || 'LEER ARTICULO';
  const columns = currentProps.columns || 3;

  const handleAddPost = () => {
    const newPost = {
      card_title: 'NUEVO ARTICULO O NOTICIA',
      card_excerpt: 'DESCRIPCION: Resumen explicativo de la publicacion.',
      card_date: '26 OCT 2026',
      card_image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
      link: '/#1',
    };
    onFieldChange('posts', [...posts, newPost]);
  };

  const handleRemovePost = (idx) => {
    onFieldChange('posts', posts.filter((_, i) => i !== idx));
  };

  const handleUpdatePost = (idx, field, value) => {
    const nextPosts = [...posts];
    nextPosts[idx] = { ...nextPosts[idx], [field]: value };
    onFieldChange('posts', nextPosts);
  };

  return (
    <div style={{ borderTop: '1px solid var(--md-sys-color-outline-variant)', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
          Articulos y Publicaciones ({posts.length})
        </h4>
        <button
          type="button"
          onClick={handleAddPost}
          style={{
            padding: '0.25rem 0.65rem',
            borderRadius: 'var(--md-shape-full)',
            border: 'none',
            backgroundColor: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          <Plus size={13} />
          <span>Anadir Post</span>
        </button>
      </div>

      {/* Button CTA text and columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Texto del Boton
          </label>
          <input
            type="text"
            value={cta}
            onChange={(e) => onFieldChange('cta', e.target.value)}
            style={{
              width: '100%',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--md-shape-sm)',
              border: '1px solid var(--md-sys-color-outline-variant)',
              backgroundColor: 'var(--md-sys-color-surface)',
              color: 'var(--md-sys-color-on-surface)',
              fontSize: '0.8rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '0.25rem' }}>
            Columnas
          </label>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[2, 3, 4].map((col) => (
              <button
                key={col}
                type="button"
                onClick={() => onFieldChange('columns', col)}
                style={{
                  flex: 1,
                  padding: '0.4rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: columns === col ? '1px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: columns === col ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container)',
                  color: columns === col ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)',
                  fontSize: '0.75rem',
                  fontWeight: columns === col ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {col}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts List Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {posts.map((post, idx) => (
          <div
            key={idx}
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--md-shape-md)',
              backgroundColor: 'var(--md-sys-color-surface-container)',
              border: '1px solid var(--md-sys-color-outline-variant)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--md-sys-color-primary)' }}>
                Articulo #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemovePost(idx)}
                title="Eliminar articulo"
                style={{ background: 'none', border: 'none', color: 'var(--md-sys-color-error)', cursor: 'pointer', padding: 0 }}
              >
                <Trash2 size={13} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Titulo del articulo"
              value={post.card_title || ''}
              onChange={(e) => handleUpdatePost(idx, 'card_title', e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.8rem',
                boxSizing: 'border-box',
                marginBottom: '0.35rem',
              }}
            />

            <textarea
              rows={2}
              placeholder="Extracto o descripcion breve"
              value={post.card_excerpt || ''}
              onChange={(e) => handleUpdatePost(idx, 'card_excerpt', e.target.value)}
              style={{
                width: '100%',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--md-shape-sm)',
                border: '1px solid var(--md-sys-color-outline-variant)',
                backgroundColor: 'var(--md-sys-color-surface)',
                color: 'var(--md-sys-color-on-surface)',
                fontSize: '0.78rem',
                boxSizing: 'border-box',
                marginBottom: '0.35rem',
                fontFamily: 'inherit',
              }}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', marginBottom: '0.35rem' }}>
              <input
                type="text"
                placeholder="Fecha (ej. 24 OCT 2026)"
                value={post.card_date || ''}
                onChange={(e) => handleUpdatePost(idx, 'card_date', e.target.value)}
                style={{
                  padding: '0.35rem 0.5rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.75rem',
                }}
              />
              <input
                type="text"
                placeholder="URL de imagen"
                value={post.card_image || ''}
                onChange={(e) => handleUpdatePost(idx, 'card_image', e.target.value)}
                style={{
                  padding: '0.35rem 0.5rem',
                  borderRadius: 'var(--md-shape-sm)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  backgroundColor: 'var(--md-sys-color-surface)',
                  color: 'var(--md-sys-color-on-surface)',
                  fontSize: '0.75rem',
                }}
              />
            </div>

            {LinkInput && (
              <LinkInput
                label="Destino al hacer clic en el articulo"
                value={post.link || ''}
                onChange={(nextLink) => handleUpdatePost(idx, 'link', nextLink)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
