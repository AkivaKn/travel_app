export default function DeleteModal() {
    const handleDelete = () => {
        
    }
    
    return (
        <div className="absolute w-1/2 h-1/2">
            <p>Are you sure you want to delete this?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={cancelDelete}>Cancel</button>

        </div>
    )
}