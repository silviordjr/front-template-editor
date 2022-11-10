import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import logoCasal from '../img/casal_logo.png'
import { useState, useEffect } from 'react';

// const navigationRoutes = ["home", "signup", "users", "signout"];

const getUserRole = async (token: string | undefined) => {
  if (typeof token === 'undefined'){
    return {
        role: false
    }
  }

  const content = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    },
    method: 'GET',
  }

  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/token`, content)
  const response = await data.json()

  return response
} 

export default function Header () {
  const router = useRouter();
  const [isActiveResponsiveMenu, setIsActiveResponsiveMenu] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({})
  const token = localStorage.getItem('token')?.toString()

  const changeResponsiveMenuStatus = () => {
    setIsActiveResponsiveMenu(!isActiveResponsiveMenu);
  }

  const closeResponsiveMenu = () => {
    setIsActiveResponsiveMenu(false)
  }

  const signout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  useEffect(() => {
    getUserRole(token)
    .then((res) => {
      setUserInfo(res.role)
    })
  }, [token])

  let navigationRoutes

  if (userInfo === "ADMIN"){
    navigationRoutes = ["home", "signup", "users", "signout"];
  } else {
    navigationRoutes = ["home", "users", "signout"];
  }


  const navigation = navigationRoutes.map((singleRoute) => {
    let nameOnHeader = ''

    if (singleRoute === 'home') {
      nameOnHeader = "Página Inicial"
    }

    if(singleRoute === 'signup'){
      nameOnHeader = "Criar Usuário"
    }

    if (singleRoute === 'users') {
      nameOnHeader = 'Buscar Usuários'
    }

    if (singleRoute === 'signout') {
      nameOnHeader = 'Sair'
      return(
        <>
          <div key={singleRoute} className={`nav-item ml-8 cursor-pointer`} onClick={() => signout()}>
            {nameOnHeader}
          </div>
        </>
      )
    }

    return (
      <NavigationLink
        key={singleRoute}
        href={`/${singleRoute}`}
        text={nameOnHeader}
        router={router}
      />
    )
  })

  return (
    <>
    <header className="w-full bg-gray-300 shadow-xl h-24">
      <div className='flex justify-between items-center max-w-screen-xl mx-auto h-24 px-4 lg:px-0'>
      <Link href={"/"} passHref>
        <div className='cursor-pointer'>
          <Image
            src={logoCasal}
            alt={'Logo Casal'}
            layout="fixed"
            unoptimized={true}
            height='55'
            width='120'
            className=""
          />
        </div>
      </Link>

      <button className="md:hidden block text-3xl mr-4" onClick={() => changeResponsiveMenuStatus()}>☰</button>
      {isActiveResponsiveMenu && 
      <div className="absolute top-0 right-0 w-screen h-screen z-20" onClick={() => closeResponsiveMenu()}>
      <nav className="md:hidden absolute top-0 right-0 bg-gray-300 min-h-max flex flex-col items-start justify-between my-20 py-4 pr-8 rounded-lg shadow-xl gap-y-4 z-50">
        {navigation}
      </nav>  
      </div>
      }
      <nav className="hidden md:block nav-container">
        {navigation}
      </nav>

      </div>
    </header>
    </>
  )
}

function NavigationLink (props: any) {
  const {router, href, text} = props
  const isActive = router.asPath === (href === "/home" ? "/" : href);

  return (
    <Link href={href === "/home" ? "/" : href} className={`${isActive && "nav-item-active"} nav-item ml-8`} passHref>
      
          {text}
    </Link>
  )
}