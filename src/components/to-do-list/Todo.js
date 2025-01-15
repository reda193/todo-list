import { useCallback, useEffect, useState } from "react";

const Todo = () => {
    const [inputValue, setInputValue] = useState('');
    const [priorityValue, setPriorityValue] = useState('');
    const [toDoList, setToDoList] = useState([
        {checked: false, text:'Run 20 miles', priority: 'High'},
        {checked: false, text:'Study for interview', priority: 'Medium'},
        {checked: false, text: 'Sleep 8 hours', priority: 'Low'}
    ]);

    const getStyles = (text) => {
        if (text.toLowerCase().includes('High')) {
            return 'bg-red-100 text-red-800';
          } else if (text.toLowerCase().includes('Medium')) {
            return 'bg-green-100 text-green-800';
          } else if (text.toLowerCase().includes('Low')) {
            return 'bg-yellow-100 text-yellow-800';
          }
          return 'bg-gray-50 text-gray-600 dark:bg-gray-200';  
    };
    const handleChange = useCallback((e, index) => {
        const check = toDoList[index]['checked']
        if(check === true){
            const newArray = [...toDoList]
            newArray[index] = {...newArray[index], checked: !newArray[index].checked}
            setToDoList(newArray)
        } else {
            const newArray = [...toDoList]
            newArray[index] = {...newArray[index], checked: !newArray[index].checked}
            console.log(newArray);
            setToDoList(newArray)
        }
        console.log(toDoList)
    }, [toDoList]);


    useEffect(() => {
        console.log('Updated toDoList:', toDoList)
    }, [toDoList])

    const removeSelected = useCallback(() => {
        const newList = toDoList.filter(user => user.checked === false);
        setToDoList(newList);
        console.log(toDoList);
    }, [toDoList]);
    
    const addNew = useCallback(() => {
        setToDoList([...toDoList, {checked: false, text: inputValue, priority: priorityValue}])
        setInputValue('');
        setPriorityValue('');
    }, [toDoList, inputValue, priorityValue]);

    const priorityNew = useCallback((event) => {
        setPriorityValue(event.target.value)
        
    }, [])

    const renderList = useCallback(() =>{
        return toDoList.slice(0, toDoList.length).map((line, lineIndex) => (
            
            <tr class="font-bold">
                <td class="border border-slate-950 dark:bg-gray-200 dark:text-gray-600">{lineIndex + 1}</td>
                <td className={`border border-slate-950 dark:bg-gray-200 dark:text-gray-600`}><input onChange={(e) => handleChange(e, lineIndex)} checked={line.checked} tabIndex={lineIndex}type="checkbox"></input> {line['text']} </td>
                <td className={`border border-slate-950 ${line.priority.includes('High') ? 'bg-red-100 text-red-800' : line.priority.includes('Medium') ? 'bg-orange-100 text-orange-800' : line.priority.includes('Low') ? 'bg-yellow-100 text-yellow-800' :'bg-gray-50 text-gray-600 dark:bg-gray-200'}`} > {line['priority']}</td>
            </tr>
        ))
    }, [toDoList]);

    return (
        <div>
            <div className="container mx-auto p-4">
                <table className="w-full border-collapse border mb-20">
                    <thead class="text-m border border-slate-950 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-black">
                        <tr className="bg-gray-400 border border-slate-950">
                            <th className="border p-2 border-slate-950">Number</th>
                            <th className="border p-2 border-slate-950">Name</th>
                            <th className="border p-2 border border-slate-950">Priority</th>
                        </tr>
                    </thead>
                    {renderList()}
                </table>
            </div>
            <div className="flex justify-center items-center gap-4">
                <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={addNew}
                >
                Add New
                </button>
                <button 
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={removeSelected}
                >
                Remove Selected
                </button>
                </div>
            <div className="flex justify-center items-center gap-8 pt-10">
                <div className="flex items-center">
                    <input
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    onChange={priorityNew}
                    checked={priorityValue === "High"}
                    value="High"
                    type="radio"
                    name="priority"
                    id="High"
                    />
                    <label htmlFor="High" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                    High
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    onChange={priorityNew}
                    checked={priorityValue === "Medium"}
                    value="Medium"
                    type="radio"
                    name="priority"
                    id="Medium"
                    />
                    <label htmlFor="Medium" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                    Medium
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    onChange={priorityNew}
                    checked={priorityValue === "Low"}
                    value="Low"
                    type="radio"
                    name="priority"
                    id="Low"
                    />
                    <label htmlFor="Low" className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
                    Low
                    </label>
                </div>
            </div>

        </div>
        
    )
};

export default Todo;