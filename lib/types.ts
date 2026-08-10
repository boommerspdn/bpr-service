// Strapi v5 (flat) response types for the BPR Service backend.
//
// Field names follow the API map + mockups and are best-effort; uncertain
// fields are optional so a slightly different schema still type-checks.
// Reconcile against the first live response if anything is off.

/** A Strapi media/upload object (flattened in v5). */
export interface StrapiMedia {
  id: number
  url: string
  alternativeText?: string | null
  width?: number | null
  height?: number | null
}

/** Generic Strapi v5 response wrappers. */
export interface StrapiSingleResponse<T> {
  data: T | null
  meta: Record<string, unknown>
}

export interface StrapiListResponse<T> {
  data: T[]
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export type UnitType =
  | "wall_unit"
  | "hanging_unit"
  | "ceiling_cassette"
  | "floor_unit"

export type EcoGrade =
  | "5_5stars"
  | "5_4stars"
  | "5_3stars"
  | "5_2stars"
  | "5_1star"
  | "5_0star"

export interface Brand {
  id: number
  documentId: string
  name: string
  logo?: StrapiMedia | null
  /** Service types offered, shown as labels on the brand card. */
  wallUnit?: boolean
  floorUnit?: boolean
  ceilingCassette?: boolean
  hangingUnit?: boolean
}

/** A single model row in a product's specs table. */
export interface Spec {
  id: number
  model: string
  btu?: number | null
  seer?: number | null
  ecoGrade?: EcoGrade | null
  price?: number | null
}

export interface Product {
  id: number
  documentId: string
  /** Server-injected UUID, used as the route param. */
  slug?: string | null
  name: string
  unitType?: UnitType | null
  /** One image per the API map; may arrive as an array if multiple. */
  image?: StrapiMedia | StrapiMedia[] | null
  brand?: Brand | null
  specs?: Spec[]
}

export interface Feature {
  id: number
  title: string
  description?: string | null
  icon?: StrapiMedia | null
}

export interface Layout {
  id: number
  documentId: string
  logo?: StrapiMedia | null
  favicon?: StrapiMedia | null
  lineId?: string | null
  phoneNumber?: string | null
  address?: string | null
  googleMapEmbedSrc?: string | null
}

export type LayoutContact = Pick<Layout, "lineId" | "phoneNumber">

export interface HomePage {
  id: number
  documentId: string
  heroTitle?: string | null
  heroSubtitle?: string | null
  ctaLabel?: string | null
  heroImage?: StrapiMedia | null
  features?: Feature[]
  seo?: Seo | null
}

export interface Seo {
  id?: number
  title?: string | null
  description?: string | null
  /** Legacy field names kept as a compatibility fallback. */
  metaTitle?: string | null
  metaDescription?: string | null
}

export interface ContactPage {
  id: number
  documentId: string
  subtitle: string
  description: string
  mapTitle: string
  seo?: Seo | null
}

export interface WorksPage {
  id: number
  documentId: string
  images?: StrapiMedia[] | null
  seo?: Seo | null
}
