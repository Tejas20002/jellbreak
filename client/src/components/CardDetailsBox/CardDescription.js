import { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useClickOutside from '../../hooks/useClickOutside';
import CloseIcon from '../icons/CloseIcon';

import 'react-quill/dist/quill.snow.css';

const CardDescription = ({ handleCardUpdate, selectedCard }) => {
  const [descForm, setDescForm] = useState(false);
  const [descValue, setDescValue] = useState(selectedCard.description);

  const boxRef = useRef(null);
  useClickOutside(boxRef, () => setDescForm(false));

  const onValueChange = (value) => {
    setDescValue(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updatedCard = { ...selectedCard, description: descValue };
    handleCardUpdate(updatedCard);
    setDescForm(false);
  };

  return (
    <div className='mt-6 mb-8'>
      <div className='flex items-center text-gray-800 mb-4'>
        <span className='material-icons-outlined mr-2.5'>event_note</span>
        <span className='font-semibold text-xl'>Description</span>
      </div>
      {descForm ? (
        <div ref={boxRef}>
          <form onSubmit={(e) => handleOnSubmit(e)}>
            <ReactQuill
              value={descValue || ''}
              onChange={(value) => onValueChange(value)}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link'],
                ],
              }}
              placeholder='Add a description to this card...'
            />
            <div className='flex items-center py-1'>
              <button
                type='submit'
                className='bg-green-500 font-medium text-white hover:bg-green-600
                transition-colors duration-150 px-3 py-1 rounded-md shadow-sm'
              >
                Save
              </button>
              <button
                type='button'
                className='flex items-center ml-2.5 opacity-50 hover:opacity-100 transition-opacity duration-100'
                onClick={() => setDescForm(false)}
              >
                <CloseIcon />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div
            role='button'
            onClick={() => setDescForm(true)}
            className='hover:shadow text-gray-800 bg-gray-50 cursor-pointer
              px-3 py-1.5 pb-8 transition-shadow duration-150 break-words rounded-md'
          >
            {descValue ? (
              <span dangerouslySetInnerHTML={{ __html: descValue }} />) : (
              'Add a description to this card...'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDescription;
