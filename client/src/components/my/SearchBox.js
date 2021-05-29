import React, { useState } from 'react';
import { fetchWordDoors } from '../../redux/actions/doorsA'
import { useDispatch } from 'react-redux';

///////Tooltip//////////
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
     color: 'rgba(0, 0, 0, 0.87)',
     color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

//////////////////EndTolltip/////////////




export default function SearchBox(props) {
  const [word, setWord] = useState('');
  const [inputValid, setInputValid] = useState(false);

  const [inCodeError, setInCodeError] = useState('Введите название модели');

  const textHandler = (e) => {
    const re = /^([a-zа-яё]+)$/i
    // const re = /^([a-zа-яё]+|\d+)$/i
    if (!re.test(e.target.value)) {
      setInCodeError('Введите только буквы ')
    } else {
      setInCodeError('')
    }
    setWord(e.target.value)
  }

  React.useEffect(() => {
    if (word.length && !inCodeError.length) {
      setInputValid(true)
    } else {
      setInputValid(false)
    }
  }, [word])

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/door/word/${word}`);
    dispatch(
      fetchWordDoors({
        word
      })
    )
  }

  return (
    <form className="search" onSubmit={submitHandler}>
      <div >
        
        <LightTooltip title={inCodeError} placement="top">
          <input style={{ borderRadius: 0 }}
            value={word}
            //  placeholder="Название модели"
            type="text"
            name="q"
            maxLength="20"
            id="q"
            onChange={e => textHandler(e)}
          ></input>
        </LightTooltip>

        <button
          type="submit"
          disabled={!inputValid}
        >
          <i className="fa fa-search"></i>

        </button>
      </div>
    </form>
  );
}
