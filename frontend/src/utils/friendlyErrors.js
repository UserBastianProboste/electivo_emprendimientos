/*
 * Module: FriendlyErrors
 * Description: Sanitizes and translates technical runtime and network errors into clear, actionable Spanish messages
 * Created: 2026-10-26
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-26 [v1.0.0]: Initial implementation of friendly error message dictionary and mapper.
 */

/**
 * Maps technical JavaScript, fetch, CORS, or WebSocket exceptions to friendly human copy.
 * @param {Error|string} error - Caught error object or message string
 * @returns {{ title: string, message: string, suggestion: string }}
 */
export function formatFriendlyError(error) {
  const rawMsg = typeof error === 'string' ? error : error?.message || '';
  const lower = rawMsg.toLowerCase();

  // CORS / Failed to fetch
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('cors')) {
    return {
      title: 'Problema de Conexion con el Servidor',
      message: 'No fue posible conectar con el servicio remoto en este momento.',
      suggestion: 'Tus cambios continuan guardados en tu navegador. Verifica tu conexion a internet o reintenta en unos instantes.',
    };
  }

  // WebSocket
  if (lower.includes('websocket') || lower.includes('socket') || lower.includes('ws://') || lower.includes('wss://')) {
    return {
      title: 'Conexion en Tiempo Real Interrumpida',
      message: 'La sincronizacion en segundo plano se desconecto momentaneamente.',
      suggestion: 'No te preocupes: puedes continuar disenando y todos tus avances estan protegidos en la memoria local.',
    };
  }

  // LocalStorage Quota
  if (lower.includes('quota') || lower.includes('storage') || lower.includes('quotaexceeded')) {
    return {
      title: 'Memoria Local Llena',
      message: 'El navegador tiene poco espacio disponible para almacenar imagenes pesadas.',
      suggestion: 'Te sugerimos exportar tu diseno actual como archivo JSON desde el boton de descarga para mantener un respaldo seguro.',
    };
  }

  // JSON Parse
  if (lower.includes('json') || lower.includes('syntaxerror') || lower.includes('unexpected token')) {
    return {
      title: 'Formato de Datos Inesperado',
      message: 'Hubo una discrepancia al interpretar la informacion guardada.',
      suggestion: 'Hemos aplicado valores predeterminados seguros para que no pierdas el control de tu pagina.',
    };
  }

  // Generic Fallback
  return {
    title: 'Aviso de Funcionamiento',
    message: rawMsg ? 'Ocurrio un evento imprevisto al procesar esta accion.' : 'La accion no se pudo completar.',
    suggestion: 'Puedes descartar los cambios recientes o recargar la pagina para restablecer el estado estable.',
  };
}
