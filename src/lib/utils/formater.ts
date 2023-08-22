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

export function numToRoman(num: number): string {
  if (num <= 0 || num > 3999) {
    throw new Error("Number out of range for Roman numeral conversion.");
  }

  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const numerals = [
    "M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"
  ];

  let result = "";

  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += numerals[i];
      num -= values[i];
    }
  }

  return result;
}

export function dateToString(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}