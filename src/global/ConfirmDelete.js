export default function ConfirmDelete({onClose,handleDelete,value}){
    return(
        <div className='flex flex-col gap-5 items-center justify-center'>
            <h1 className='text-lg font-semibold text-center'>Are you Sure?</h1>
            <p className='text-sm'>You won't be able to revert this!</p>
            <div className='flex gap-2'>
                <button className='bg-primary flex items-center text-sm text-white rounded-md px-8 py-3 shadow-md'onClick={()=> handleDelete(value)} >Delete</button>
                <button className="bg-white text-primary border text-sm rounded-md border-primary px-8 py-3 shadow-md" onClick={onClose}>Cancel</button>

            </div>
        </div>
    )
}