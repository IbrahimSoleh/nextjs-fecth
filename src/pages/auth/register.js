import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const Register = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password } = input;
    axios.post("/api/register", { name, email, password }).then(() => {
      router.push("/login");
    });
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Register
      </Typography>
      <form
        onSubmit={handleSubmit}
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Name'
            id='name'
            name='name'
            type='text'
            required
            onChange={handleChange}
          />
          <Input
            size='lg'
            label='Email'
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            onChange={handleChange}
          />
          <Input
            type='password'
            size='lg'
            label='Password'
            id='password'
            name='password'
            autoComplete='current-password'
            required
            onChange={handleChange}
          />
        </div>
        <Button className='mt-6' type='submit' fullWidth>
          Register
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          <Link
            href='../../auth/login'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Login to your account
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default Register;
