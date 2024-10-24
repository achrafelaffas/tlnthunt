export function postedXAgo(pastDate: string | Date): string {
  const now = new Date();
  const past = new Date(pastDate);
  const differenceInMilliseconds = now.getTime() - past.getTime();
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  const hours = Math.floor(differenceInHours);
  const minutes = Math.floor(differenceInMinutes);
  if (hours == 0) return String(minutes) + "m ago";
  else if (hours < 25) return String(hours) + "h ago";
  else return new Date(pastDate).toDateString();
}
