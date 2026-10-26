/*
 * Module: MediaContentWidgets
 * Description: Renders Blog grid, Video embed, and FAQ Accordion widgets (Widgets 16, 17, 18)
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of media and content widgets.
 * - 2026-10-26 [v1.3.0]: Added mobile 1-column adaptation, variant handling (list/cinema/divided), and smooth transitions.
 * - 2026-10-26 [v1.4.0]: Added YouTube, Vimeo, and MP4 video player resolver.
 */

import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';

function resolveVideoEmbed(rawUrl) {
  if (!rawUrl) return null;
  const yt = rawUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vm = rawUrl.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  return null;
}

export function ContentBlogGridWidget({ props = {}, onNavigate = () => {}, deviceViewport = 'desktop' }) {
  const {
    variant = 'standard',
    columns = 3,
    posts = [],
    cta = 'LEER ARTICULO',
  } = props;

  const isMobile = deviceViewport === 'mobile';
  const isList = variant === 'list';

  const colTemplate = isMobile || isList
    ? '1fr'
    : `repeat(auto-fit, minmax(${columns >= 4 ? '220px' : '260px'}, 1fr))`;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: colTemplate,
        gap: '1.25rem',
        padding: '0.75rem 0',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {posts.map((post, idx) => (
        <article
          key={idx}
          style={{
            backgroundColor: 'var(--md-sys-color-surface-container-low)',
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: 'var(--md-shape-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--md-elevation-1)',
            display: 'flex',
            flexDirection: isList && !isMobile ? 'row' : 'column',
            transition: 'transform 120ms ease, box-shadow 120ms ease',
            boxSizing: 'border-box',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--md-elevation-2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--md-elevation-1)';
          }}
        >
          {post.card_image && (
            <img
              src={post.card_image}
              alt={post.card_title}
              style={{
                width: isList && !isMobile ? '240px' : '100%',
                height: isList && !isMobile ? '100%' : '170px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
          <div style={{ padding: '1.15rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.725rem', color: 'var(--md-sys-color-primary)', fontWeight: 700, marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              {post.card_date}
            </span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)', marginBottom: '0.45rem' }}>
              {post.card_title}
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--md-sys-color-on-surface-variant)', lineHeight: 1.5, marginBottom: '1.15rem', flex: 1 }}>
              {post.card_excerpt}
            </p>
            <button
              type="button"
              onClick={() => onNavigate(post.link || '/#1')}
              style={{
                alignSelf: 'flex-start',
                background: 'none',
                border: 'none',
                color: 'var(--md-sys-color-primary)',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: 0,
                transition: 'gap 100ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = '0.5rem')}
              onMouseLeave={(e) => (e.currentTarget.style.gap = '0.3rem')}
            >
              <span>{cta}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export function VideoGalleryWidget({ props = {} }) {
  const {
    variant = 'standard',
    source = '',
    thumbnail = 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=800&q=80',
    caption = 'DESCRIPCION: Video institucional y presentacion de manufactura.',
    aspect_ratio = '16:9',
  } = props;

  const [playing, setPlaying] = useState(false);
  const isCinema = variant === 'cinema';
  const effectiveRatio = isCinema ? '21/9' : aspect_ratio.replace(':', '/');
  const embedUrl = resolveVideoEmbed(source);

  return (
    <div
      style={{
        backgroundColor: 'var(--md-sys-color-surface-container-low)',
        border: '1px solid var(--md-sys-color-outline-variant)',
        borderRadius: 'var(--md-shape-lg)',
        overflow: 'hidden',
        padding: '0.85rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: effectiveRatio,
          borderRadius: 'var(--md-shape-md)',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
      >
        {playing && source ? (
          embedUrl ? (
            <iframe
              src={embedUrl}
              title="Video Player"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          ) : (
            <video src={source} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )
        ) : (
          <div
            onClick={() => setPlaying(true)}
            style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
          >
            <img src={thumbnail} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '54px', height: '54px', borderRadius: '50%', backgroundColor: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', transition: 'transform 120ms ease' }}>
                <Play size={22} style={{ marginLeft: '3px' }} />
              </div>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <p style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)', textAlign: 'center', marginTop: '0.65rem', marginBottom: 0 }}>
          {caption}
        </p>
      )}
    </div>
  );
}

export function AccordionFaqWidget({ props = {} }) {
  const {
    variant = 'standard',
    items = [
      { question: 'PREGUNTA FRECUENTE: Tiempos de entrega', answer: 'RESPUESTA: Realizamos envios en 24 a 48 horas habiles.' },
    ],
    default_open = 0,
    allow_multiple = false,
  } = props;

  const [openIndices, setOpenIndices] = useState([default_open]);
  const isDivided = variant === 'divided';

  const toggleIndex = (idx) => {
    if (allow_multiple) {
      setOpenIndices(openIndices.includes(idx) ? openIndices.filter((i) => i !== idx) : [...openIndices, idx]);
    } else {
      setOpenIndices(openIndices.includes(idx) ? [] : [idx]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: isDivided ? '0' : '0.65rem', padding: '0.5rem 0', width: '100%', boxSizing: 'border-box' }}>
      {items.map((item, idx) => {
        const isOpen = openIndices.includes(idx);
        return (
          <div
            key={idx}
            style={{
              backgroundColor: isDivided ? 'transparent' : 'var(--md-sys-color-surface-container-low)',
              border: isDivided ? 'none' : '1px solid var(--md-sys-color-outline-variant)',
              borderBottom: isDivided ? '1px solid var(--md-sys-color-outline-variant)' : undefined,
              borderRadius: isDivided ? '0' : 'var(--md-shape-md)',
              overflow: 'hidden',
              transition: 'background-color 120ms ease',
            }}
          >
            <button
              type="button"
              onClick={() => toggleIndex(idx)}
              style={{
                width: '100%',
                padding: '0.85rem 1.15rem',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
                color: 'var(--md-sys-color-on-surface)',
                fontWeight: 700,
                fontSize: '0.9rem',
                gap: '0.5rem',
              }}
            >
              <span>{item.question}</span>
              {isOpen ? <ChevronUp size={18} color="var(--md-sys-color-primary)" /> : <ChevronDown size={18} color="var(--md-sys-color-on-surface-variant)" />}
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '0 1.15rem 0.85rem 1.15rem',
                  fontSize: '0.85rem',
                  color: 'var(--md-sys-color-on-surface-variant)',
                  lineHeight: 1.55,
                  animation: 'fadeIn 120ms ease',
                }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
