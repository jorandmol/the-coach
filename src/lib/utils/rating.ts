import { Angry, Frown, Laugh, Meh, Smile } from "lucide-svelte";

type RatingStyle = {
  icon: any,
  color: string,
  hexColor: string,
  label: string
}

export const ratingMap: Record<number, RatingStyle> = {
  1: { icon: Angry, color: 'bg-red-500', hexColor: '#f44336', label: 'Very bad' },
  2: { icon: Frown, color: 'bg-orange-500', hexColor: '#ff5722', label: 'Bad' },
  3: { icon: Meh, color: 'bg-yellow-500', hexColor: '#ffeb3b', label: 'Normal' },
  4: { icon: Smile, color: 'bg-green-500', hexColor: '#4caf50', label: 'Good' },
  5: { icon: Laugh, color: 'bg-green-700', hexColor: '#388e3c', label: 'Very good' }
};