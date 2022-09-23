export default function Search(props) {
  const { text, setText } = props

  const setInputText = (event) => {
    setText(event.target.value)
  }

  return (
    <div className="input-icon">
      <span className="input-icon-addon">
       <i className="ti ti-search" />
      </span>
      <input type="text" className="form-control" placeholder="Search" value={text} onChange={setInputText} />
    </div>
  )
}