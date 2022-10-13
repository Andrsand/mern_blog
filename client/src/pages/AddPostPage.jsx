import React from "react";

export const AddPostPage = () => {
    return (
        <form
            className='w-1/3 mx-auto py-10'
            onSubmit={(e) => e.preventDefault()}
        >
            <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
                Прикрепить изображение:
                <input type='file' className='hidden' />
            </label>
        </form>
    )
}