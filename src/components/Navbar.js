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
            <Link href='../../auth/login'>Login</Link>
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
  );
}
