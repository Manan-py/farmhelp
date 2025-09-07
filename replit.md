# Overview

This is a full-stack web application built with React frontend and Express.js backend, featuring a dashboard interface for plant growth monitoring. The application uses TypeScript throughout and includes modern UI components with shadcn/ui, database integration with Drizzle ORM and PostgreSQL, and comprehensive development tooling.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript in SPA mode
- **Build Tool**: Vite for development and production builds
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Forms**: React Hook Form with Zod validation resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with `/api` prefix routing
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod schemas for runtime type validation
- **Development**: Hot reload with tsx and custom error handling middleware

## Database Design
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Connection**: Neon serverless driver for production deployments
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Models**: User model with username/password authentication structure

## Development Workflow
- **Monorepo Structure**: Client and server code in separate directories with shared types
- **Path Aliases**: TypeScript path mapping for clean imports (`@/`, `@shared/`)
- **Hot Reload**: Vite HMR for frontend, tsx for backend development
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code

## Key Design Decisions

### Data Storage Strategy
- **Development**: In-memory storage implementation for rapid prototyping
- **Production**: PostgreSQL with Drizzle ORM for type safety and performance
- **Interface Pattern**: Storage abstraction layer allowing easy switching between implementations

### Component Architecture
- **Design System**: shadcn/ui provides consistent, accessible components
- **Customization**: Tailwind CSS with CSS variables for theme customization
- **Layout**: Responsive design with mobile-first approach

### API Design
- **RESTful Conventions**: Standard HTTP methods and status codes
- **Error Handling**: Centralized error middleware with consistent response format
- **Request Logging**: Custom middleware for API request tracking and debugging

### Build and Deployment
- **Development**: Separate dev servers for client and API with proxy setup
- **Production**: Single build process combining frontend assets and backend bundle
- **Asset Management**: Vite handles frontend bundling, esbuild for backend

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database ORM
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management and validation

## UI and Styling
- **@radix-ui/react-***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: CSS class utilities

## Development Tools
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Backend bundling for production
- **drizzle-kit**: Database schema management and migrations

## Validation and Type Safety
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle ORM and Zod schemas
- **@hookform/resolvers**: React Hook Form integration with validation libraries

The application is designed as a modern full-stack TypeScript application with emphasis on type safety, developer experience, and production readiness. The architecture supports both rapid development iteration and scalable production deployment.