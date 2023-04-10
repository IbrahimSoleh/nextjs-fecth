import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Navbar, Typography } from "@material-tailwind/react";

export default function navbar() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(true);
    } else if (!token) {
      setToken(false);
    }
  }, [token]);

  return (
    <Navbar className='mx-auto max-w-screen-xl px-8 py-4'>
      <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
        <Typography
          variant='small'
          className='mr-4 cursor-pointer py-1.5 font-bold text-2xl'
        >
          <Link href='/'>Book</Link>
        </Typography>
        <div className=''>
          <ul className=' flex mb-0 mt-0 flex-row items-center gap-6'>
            <Typography
              as='li'
              variant='small'
              color='blue-gray'
              className='p-1 font-bold'
            >
              <Link href='/'>Home</Link>
            </Typography>
            {token && (
              <Typography
                as='li'
                variant='small'
                color='blue-gray'
                className='p-1 font-bold ml-3'
              >
                <Link href='/books/bookForm'>Add Book</Link>
              </Typography>
            )}
          </ul>
        </div>
        {!token && (
          <Button variant='gradient' size='sm'>
            <Link href='/login'>Login</Link>
          </Button>
        )}
        {token && (
          <Button
            variant='gradient'
            size='sm'
            onClick={() => {
              Cookies.remove("token");
              window.location = "/";
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </Navbar>
    // <nav className='flex items-center justify-between flex-wrap bg-[#082032] p-6 sticky top-0 z-50'>
    //   <div className='flex items-center flex-shrink-0 text-white mr-6'>
    //     <span className='font-semibold text-xl tracking-tight'>
    //       Booking Books
    //     </span>
    //   </div>
    //   <div className='w-full block flex-grow flex items-center w-auto'>
    //     <div className='text-sm flex-grow'>
    //       <Button variant='text'>
    //         <Link
    //           href='/'
    //           className='block mt-4 inline-block mt-0 text-[#FF4C29] hover:text-white mr-4'
    //         >
    //           Book List
    //         </Link>
    //       </Button>
    //       {token && (
    //         <Link
    //           href='/books/create'
    //           className='block mt-4 inline-block mt-0 text-[#FF4C29] hover:text-white mr-4'
    //         >
    //           Add Book
    //         </Link>
    //       )}
    //     </div>
    //     <div>
    //       {!token && (
    //         <Button variant='text'>
    //           <Link href='/login'>Login</Link>
    //         </Button>
    //       )}
    //       {token && (
    //         <Button
    //           variant='text'
    //           onClick={() => {
    //             Cookies.remove("token");
    //             window.location = "/";
    //           }}
    //         >
    //           Logout
    //         </Button>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
}
