export function slugify(text: string): string {
  // Convert text to lowercase
  let slug = text.toLowerCase();

  // Replace accented characters with non-accented counterparts
  slug = slug.replace(/[áàâä]/g, 'a');
  slug = slug.replace(/[éèêë]/g, 'e');
  slug = slug.replace(/[íìîï]/g, 'i');
  slug = slug.replace(/[óòôö]/g, 'o');
  slug = slug.replace(/[úùûü]/g, 'u');
  // Remove special characters and replace spaces with hyphens
  slug = slug.replace(/[^\w\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');

  return slug;
} 