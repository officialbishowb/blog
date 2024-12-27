export function formatDate(date: Date): string {
    date.setDate(date.getDate() - 1); // Subtract one day
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString();
    
    return `${month} ${day}, ${year}`;
}