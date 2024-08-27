// utils/dateUtils.js
export function getWeekStartEndDate(data) {
    let today;
    if(!data){
        today = new Date();
    }else{
        today = data
    }
    //const today = new Date();

    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Sunday

    return { startOfWeek, endOfWeek };
}

export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
