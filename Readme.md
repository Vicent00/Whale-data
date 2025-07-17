# Whale Data - Social Trading DeFi Platform

Una plataforma que permite a los usuarios seguir a grandes inversores ("whales"), replicar sus operaciones en tiempo real y recibir notificaciones cuando estos ejecutan trades significativos.

## 🎯 Objetivos y Propuesta de Valor

- Proporcionar información en tiempo real sobre la actividad de whales on-chain
- Ofrecer métricas y visualizaciones de trading basadas en datos históricos
- Facilitar la exploración y el análisis de patrones de operación sin ejecutar transacciones

## 🚀 Características Clave

### 🔐 Autenticación y Gestión de Usuarios
- Registro y autenticación de wallets mediante RainbowKit + wagmi
- Gestión de perfiles de usuario para guardar preferencias de visualización

### 🐋 Selección y Filtros de Whales
- Lista curada de direcciones top
- Filtros dinámicos: rendimiento histórico, volumen de trading, protocolos

### 📊 Feed de Datos On-Chain
- Stream en tiempo real de operaciones de whales
- Detalles: par de tokens, monto en USD, protocolo, tipo de operación

### 📈 Visualizaciones y Métricas
- Gráficas de volumen y frecuencia de trades
- Comparativas de rendimiento entre whales
- Estadísticas agregadas (media de montos, frecuencias)

### 🔔 Alertas de Datos
- Notificaciones cuando un whale supera cierto umbral de volumen
- Notificaciones push/móvil o correo, sin ejecución de transacciones

## 🏗️ Arquitectura Técnica

### Frontend
- **Framework**: Next.js (React + SSR/SSG)
- **Wallet Connection**: RainbowKit + wagmi
- **GraphQL Client**: Apollo Client
- **Styling**: Tailwind CSS

### Backend
- **Runtime**: Node.js + Apollo Server (GraphQL)
- **Indexing**: The Graph o custom indexer
  - Subgraph que indexe Transfer y Swap de direcciones whales
  - Exponer métricas y datos puros sin lógica de ejecución
- **Database**: PostgreSQL para historiales, perfiles, configuraciones de alertas

### Integración On-Chain (Solo Lectura)
- **Library**: viem para llamadas JSON-RPC de solo lectura
  - `eth_getLogs`, `callStatic` para datos de balances y eventos
- **Providers**: Infura/Alchemy/QuickNode multi-chain (Ethereum, BSC, Polygon)

## 🛠️ Getting Started

### Prerrequisitos
- Node.js 18+
- PostgreSQL
- Cuenta en Infura/Alchemy/QuickNode

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd whale-data_app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar el servidor de desarrollo
npm run dev
```

### Variables de Entorno

```env
# Database
DATABASE_URL=postgresql://...

# Blockchain Providers
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
BSC_RPC_URL=https://bsc-dataseed.binance.org/
POLYGON_RPC_URL=https://polygon-rpc.com/

# The Graph
GRAPH_ENDPOINT=https://api.thegraph.com/subgraphs/name/...

# API Keys
ALCHEMY_API_KEY=your_alchemy_key
INFURA_API_KEY=your_infura_key
```

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Componentes reutilizables
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilidades y configuraciones
│   ├── pages/             # Páginas de la aplicación
│   └── types/             # Definiciones de TypeScript
├── graphql/               # Esquemas y resolvers GraphQL
├── services/              # Servicios de integración
└── utils/                 # Utilidades generales
```

## 🚀 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
npm run type-check   # Verificación de tipos TypeScript
```

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [wagmi Documentation](https://wagmi.sh/)
- [The Graph Documentation](https://thegraph.com/docs/)
- [viem Documentation](https://viem.sh/)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
