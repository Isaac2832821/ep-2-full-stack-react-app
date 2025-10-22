// Application constants

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Order status labels in Spanish
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendiente',
  [ORDER_STATUS.PROCESSING]: 'Procesando',
  [ORDER_STATUS.SHIPPED]: 'Enviado',
  [ORDER_STATUS.COMPLETED]: 'Completado',
  [ORDER_STATUS.CANCELLED]: 'Cancelado'
};

// Order status colors for Bootstrap badges
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.PROCESSING]: 'info',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.COMPLETED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger'
};

// Chilean regions
export const REGIONES = [
  'Región de Arica y Parinacota',
  'Región de Tarapacá',
  'Región de Antofagasta',
  'Región de Atacama',
  'Región de Coquimbo',
  'Región de Valparaíso',
  'Región Metropolitana',
  'Región del Libertador General Bernardo O\'Higgins',
  'Región del Maule',
  'Región de Ñuble',
  'Región del Biobío',
  'Región de La Araucanía',
  'Región de Los Ríos',
  'Región de Los Lagos',
  'Región de Aysén',
  'Región de Magallanes'
];

// Chilean regions with their comunas
export const REGIONES_COMUNAS = {
  'Región Metropolitana': [
    'Santiago',
    'Providencia',
    'Las Condes',
    'Vitacura',
    'Lo Barnechea',
    'Ñuñoa',
    'La Reina',
    'Macul',
    'Peñalolén',
    'La Florida',
    'San Joaquín',
    'La Granja',
    'La Pintana',
    'San Ramón',
    'San Miguel',
    'La Cisterna',
    'El Bosque',
    'Pedro Aguirre Cerda',
    'Lo Espejo',
    'Estación Central',
    'Cerrillos',
    'Maipú',
    'Quinta Normal',
    'Lo Prado',
    'Pudahuel',
    'Cerro Navia',
    'Renca',
    'Quilicura',
    'Conchalí',
    'Huechuraba',
    'Recoleta',
    'Independencia',
    'Puente Alto',
    'San Bernardo',
    'Colina',
    'Lampa',
    'Til Til',
    'Pirque',
    'San José de Maipo',
    'Buin',
    'Paine',
    'Melipilla',
    'Alhué',
    'Curacaví',
    'María Pinto',
    'San Pedro',
    'Talagante',
    'El Monte',
    'Isla de Maipo',
    'Padre Hurtado',
    'Peñaflor'
  ],
  'Región de Valparaíso': [
    'Valparaíso',
    'Viña del Mar',
    'Concón',
    'Quilpué',
    'Villa Alemana',
    'Casablanca',
    'Juan Fernández',
    'Puchuncaví',
    'Quintero',
    'San Antonio',
    'Algarrobo',
    'Cartagena',
    'El Quisco',
    'El Tabo',
    'Santo Domingo',
    'Quillota',
    'La Calera',
    'Hijuelas',
    'La Cruz',
    'Nogales',
    'San Felipe',
    'Catemu',
    'Llaillay',
    'Panquehue',
    'Putaendo',
    'Santa María',
    'Los Andes',
    'Calle Larga',
    'Rinconada',
    'San Esteban',
    'Limache',
    'Olmué'
  ],
  'Región del Biobío': [
    'Concepción',
    'Talcahuano',
    'Hualpén',
    'Chiguayante',
    'San Pedro de la Paz',
    'Penco',
    'Tomé',
    'Coronel',
    'Lota',
    'Santa Juana',
    'Hualqui',
    'Florida',
    'Los Ángeles',
    'Cabrero',
    'Tucapel',
    'Antuco',
    'Quilleco',
    'Santa Bárbara',
    'Quilaco',
    'Mulchén',
    'Negrete',
    'Nacimiento',
    'Laja',
    'San Rosendo',
    'Yumbel',
    'Chillán',
    'Chillán Viejo',
    'Bulnes',
    'Quillón',
    'San Ignacio',
    'El Carmen',
    'Pemuco',
    'Pinto',
    'Coihueco',
    'Ñiquén',
    'San Carlos',
    'San Fabián',
    'Coelemu',
    'Trehuaco',
    'Cobquecura',
    'Quirihue',
    'Ninhue',
    'Portezuelo',
    'Ránquil'
  ]
};

// Product categories
export const CATEGORIES = [
  { value: 'vans', label: 'Vans' },
  { value: 'ropa', label: 'Ropa' },
  { value: 'hogar', label: 'Hogar' }
];

// Price ranges for filtering
export const PRICE_RANGES = [
  { value: '0-50000', label: '$0 - $50.000' },
  { value: '50000-100000', label: '$50.000 - $100.000' },
  { value: '100000-', label: '$100.000+' }
];

// Tax rate (IVA in Chile)
export const TAX_RATE = 0.19;

// Pagination
export const ITEMS_PER_PAGE = 12;

// Local storage keys
export const STORAGE_KEYS = {
  CART: 'carrito',
  USER: 'usuarioActual',
  USERS: 'usuarios',
  ORDERS: 'ventas',
  PRODUCTS: 'productos'
};
