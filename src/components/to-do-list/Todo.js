import { useCallback, useEffect, useState } from "react";

const Todo = () => {
    const [value, setValue] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [toDoList, setToDoList] = useState([
        {checked: false, text:'Run 20 miles', priority: 'High'},
        {checked: false, text:'Study for interview', priority: 'Medium'},
        {checked: false, text: 'Sleep 8 hours', priority: 'Low'}
    ]);

    const handleChange = useCallback((e, index) => {
        const check = toDoList[index]['checked']
        if(check === true){
            const newArray = [...toDoList]
            newArray[index] = {...newArray[index], checked: !newArray[index].checked}
            setToDoList(newArray)
        } else {
            const newArray = [...toDoList]
            newArray[index] = {...newArray[index], checked: !newArray[index].checked}
            setToDoList(newArray)
        }
        console.log(toDoList)
    }, [toDoList]);

    useEffect(() => {
        console.log(toDoList);
    }, [toDoList])

    const removeSelected = useCallback(() => {
        console.log('asdasda')
        const newList = toDoList.filter(user => user.checked === false);
        console.log(newList);
        setToDoList(newList)
    }, [toDoList]);
    const addNew = useCallback(() => {
        setToDoList([...toDoList, {checked: false, text: inputValue}])
        setInputValue('');
    }, [toDoList, inputValue]);
    const renderList = useCallback(() =>{
    
        return toDoList.slice(0, toDoList.length).map((line, lineIndex) => (
            
            <tr>
                <td>{lineIndex + 1}</td>
                <td><input onChange={(e) => handleChange(e, lineIndex)}tabIndex={lineIndex}type="checkbox"></input>{line['text']} </td>
                <td>{line['priority']}</td>
            </tr>
        ))
    }, [toDoList]);

    return (
        <div>
            <table>
                <th>
                    Number
                </th>
                <th>
                    Name
                </th>
                <th>
                    Priority
                </th>
            {renderList()}
            </table>
            <div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={addNew}>Add New</button>
            <button onClick={removeSelected}>Remove Selected</button>
            <div>
            <input type="radio" name="High"/>
            <label for="High">High</label>

            <input type="radio" name="Medium"></input>
            <label for="High">Medium</label>
            <input type="radio" name="Low"></input>
            <label for="High">Low</label>
            </div>
            </div>
        </div>

    )
};

export default Todo;