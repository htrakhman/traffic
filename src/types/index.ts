export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  /** Custom 150-char SEO meta description targeting the category's primary keyword. */
  seoDescription?: string
}
