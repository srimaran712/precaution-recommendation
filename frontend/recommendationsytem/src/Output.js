import React from 'react'

const Output = (props) => {
  const formattedContent = props.content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return (
    <div className="w-full ml-48 my-5 px-5">
      <p className="w-1/2 ml-48">
        {formattedContent}
      </p>
    </div>
  )
}

export default Output
