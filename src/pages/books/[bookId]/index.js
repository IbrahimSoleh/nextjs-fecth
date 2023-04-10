import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Navbar from "../../../components/Navbar";
import { PrismaClient } from "@prisma/client";
import Cookies from "js-cookie";
const prisma = new PrismaClient();
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Book = ({ book }) => {
  const router = useRouter();

  const handleDelete = async (event) => {
    const bookId = parseInt(event.target.value);
    axios
      .delete(`/api/book/${bookId}`, {
        headers: { authorization: "Bearer " + Cookies.get("token") },
      })
      .then(() => {
        router.push("/");
      })
  };


  return (
    <div>
      <Navbar />
      <div className='text-3xl max-w-md text-center font-bold text-black mt-4 mx-auto'>
        Book Detail
      </div>
      <Card className="w-20 max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
      <Image
          src={`/uploads/${book.image}`}
          alt='images'
          className='object-cover w-full h-20 max-w-md m-auto'
          width={400}
          height={10}
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
          {book.title}
          </Typography>
        </div>
        <Typography color="gray">
        {book.author}
        </Typography>
        <Typography color="gray">
        {book.publisher}
        </Typography>
        <Typography color="gray">
        {book.year}
        </Typography>
        <Typography color="gray">
        {book.pages}
        </Typography>

      </CardBody>
      <CardFooter className="pt-3">
          {Cookies.get("token") && (
            <div>
           <Link href={`/books/${book.id}/edit`}>
        <Button size="lg" fullWidth={true}>
          Edit Book
        </Button>
        </Link>
        <Button
         size="lg"
          fullWidth={true}
        value={book.id}
        onClick={handleDelete}
        className="mt-4"
        >
         Delete
        </Button>
        </div>
        )}
      </CardFooter>
    </Card>
    </div>
  );
};

export default Book;

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { bookId: "1" },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const data = await prisma.book.findUnique({
    where: {
      id: parseInt(params.bookId),
    },
  });

  return {
    props: {
      book: data,
    },
    revalidate: 10,
  };
};
