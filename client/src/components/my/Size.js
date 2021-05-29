import React from 'react';

export default function Size({ size, setSz }) {

  const arr = size.split('=')
  const [s, setS] = React.useState(0)
  const onClickSize = (i) => {
    setSz(arr[i])
    setS(i)
  }
  React.useEffect(() => {
    setSz(arr[0])
  }, [])


  return (
    <div style={{ display: 'flex' }} >
      {arr.map((el, index) => (
        <div key={`${el}_${index}`}
          className={s === index ? 'size size-active' : 'size'}
          onClick={() => onClickSize(index)}>

          {el}

        </div>
      )
      )
      }

    </div>

  )
}

