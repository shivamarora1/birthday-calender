export default function Day({date}:{date: Date}){
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en',{weekday:'long'});
    return <>
    <div>
        <div>{dayName}</div>
        <div>{day}</div>
    </div>
    </>
}