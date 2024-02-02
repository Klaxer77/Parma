import HeaderAuthorized from './HeaderAuthorized'
import HeaderNoAuthorized from './HeaderNoAuthorized'

export default function Header() {
  return (
    <>
    {
      localStorage.getItem('access') ? <HeaderAuthorized /> : <HeaderNoAuthorized />
    }
    </>
  )
}