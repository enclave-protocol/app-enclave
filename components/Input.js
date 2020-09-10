export default function Input({placeholder, children}) {

  return (
      <>
        <form>
          <input type='text' placeholder={placeholder}/>
          {children}
        </form>
      </>
  )
}