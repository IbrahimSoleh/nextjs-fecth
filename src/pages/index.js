import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Books = ({ books }) => {
  return (
    <>
      <Navbar />
      <div className='xs:mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
        <div className='flex flex-col mt-10'>
          <div className='text-3xl text-center font-bold text-black mb-6 mx-auto mt-4'>
            Book
          </div>
          <div className='flex flex-wrap justify-center justify-items-center items-start mx-8 mb-16'>
            {books.map((book) => {
              return (
                <div
                  key={book.id}
                  className='max-w-sm w-1/3 m-4 md:w-full self-stretch bg-white rounded-lg border border-gray-200 shadow-md relative'
                >
                  <Card className='w-full max-w-[26rem] shadow-lg'>
                    <CardHeader floated={false} color='blue-gray'>
                      <Image
                        src={`/uploads/${book.image}`}
                        alt='Book Image'
                        className='h-60 w-full object-cover object-center rounded'
                        width={500}
                        height={500}
                      />
                      <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
                    </CardHeader>
                    <CardBody>
                      <div className='mb-3 flex items-center justify-between'>
                        <Typography
                          variant='h5'
                          color='blue-gray'
                          className='font-medium'
                        >
                          {book.title}
                        </Typography>
                      </div>
                      <Typography color='gray'>{book.author}</Typography>
                      <Typography color='gray'>{book.publisher}</Typography>
                    </CardBody>
                    <CardFooter className='pt-3'>
                      <Link href={`/books/${book.id}`}>
                        <Button size='lg' fullWidth={true}>
                          read more
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;

export const getServerSideProps = async () => {
  const data = await prisma.book.findMany();
  return {
    props: {
      books: data,
    },
  };
};
