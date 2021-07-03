import { useRef, useState } from 'react';
import { Box, Typography } from '@material-ui/core'
import { FaBars, FaTrash, FaPlus } from 'react-icons/fa'
import '@fontsource/roboto';

export default function App() {
    const draggingItem = useRef()
    const dragOverItem = useRef();
    const inputRef = useRef();
    
    const [list, setList] = useState([
        "Chicken Biryani",
        "mutton Pulao",
        "Tandoori Chicken",
        "Dal Makhni",
        "Malai Kofta",
    ])

    const handleSubmit = (e) => {
        e.preventDefault()
        const listCopy = [...list, inputRef.current.value]
        setList(listCopy)
        inputRef.current.value = ""
    }
    const handleDelete = (e) => {
        const listCopy = [...list]
        listCopy.splice(e, 1)
        setList(listCopy)
    }
    const handleDragStart = (position) => {
        draggingItem.current = position
    }
    const handleDragEnter = (position) => {
        dragOverItem.current = position;
        const listCopy = [...list]
        const draggingItemContent = listCopy[draggingItem.current]

        listCopy.splice(draggingItem.current, 1)
        listCopy.splice(dragOverItem.current, 0, draggingItemContent)

        draggingItem.current = dragOverItem.current
        dragOverItem.current = null
        setList(listCopy)
    }

    return (
        <div className = "App">
            <header className = "App-header">
                <Typography variant="h2">
                    Drag & Drop List
                </Typography>
                <Box marginTop={8} />
            </header>
            <section className = "list">
                <Typography
                    key = {list.name}
                    variant = "h3"
                >
                    <input type="text" defaultValue="To Eat List" />
                </Typography>
                {list.map((item, index) => (
                    <div className="list-item">
                        <Typography
                            onDragStart = {(e) => handleDragStart(index)}
                            onDragEnter = {(e) => handleDragEnter(index)}
                            onDragOver = {(e) => e.preventDefault()}
                            key = {index}
                            variant="h4" 
                            draggable
                        >
                            <FaBars />
                            {"\t" + item + "\t"}
                            <button onClick = {(e) => handleDelete(index)} >
                                <FaTrash />
                            </button>
                        </Typography>
                    </div>
                ))}
                <form onSubmit = {(e) => handleSubmit(e)}>
                    <div className="list-item">
                        <Typography variant="h4">
                            <FaPlus />
                            {"\t"}
                            <input type="text" ref={inputRef}/>
                        </Typography>
                    </div>
                </form>
                <Box marginTop={8} />
            </section>
        </div>
    );
}
